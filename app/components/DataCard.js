import React, { Component } from 'react';
//import { Grid, Cell, IconButton } from 'react-mdl';
import Grid from 'material-ui/Grid'
import CloseIcon from 'material-ui-icons/Close';
import ShowChartIcon from 'material-ui-icons/ShowChart';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import  Chart  from './Chart';
import { getData } from "../utils"
import { TypeChooser } from "react-stockcharts/lib/helper";
import {ipcRenderer} from 'electron';

const styles = theme => ({
  paper: {
    padding: 16,
    textAlign: 'center'
  }
})

const tickers={
  tickerRed:{
    color:'#F44336'
  },
  tickerGreen:{
    color:'#00E676'
  }
}

class DataCard extends Component{
  constructor(props){
    super(props)
    this.state={chartActive:false}
    getData().then(res=>{this.setState({data:res})})
    //ipcRenderer.on()
  }
  componentDidUpdate(){
    if(this.state.active){
      setTimeout(() => {ipcRenderer.send('chartData', this.props.coins[this.props.filter.name].MarketName)})
    }
  }
  render(){
    const classes=this.props.classes;
    const coin = this.props.coins[this.props.filter.name];
    const filter = this.props.filter;
    return(
      <Paper className={classes.paper}>
        <Grid container>
          <Grid item sm={12} style={{paddingBottom:'0'}}>
            <Typography type="subheading" component="p" align="left" style={{overflow:'visible'}}>
                <span style={{marginRight:'10px'}}>{coin.MarketName}</span>
                <IconButton onClick={ () => { this.props.removeCoin(this.props.filter) }} style={{float:'right', position:'relative', top:'-13px'}}>
                  <CloseIcon/>
                </IconButton>
                <IconButton onClick={ () => { this.props.toggleChart(this.props.filter) }}  style={ this.props.filter.chartActive?{float:'right', color:'#2196f3', position:'relative', top:'-13px'}:{float:'right', position:'relative', top:'-13px'} }>
                  <ShowChartIcon/>
                </IconButton>
                <span style={{paddingLeft:'0px', display:'inline-block', height:'32px'}}>
                  <img src={`https://files.coinmarketcap.com/static/img/coins/16x16/${filter.currencyLong.toLowerCase()}.png`} alt="" />
                </span>
            </Typography>
          </Grid>
          {
            !this.props.filter.chartActive?
              <Grid container>
                <Grid item sm={4}>
                  <Typography type="body1" component="p" align="center">
                      Ask
                  </Typography>
                  <Typography type="body1" component="p" align="center" style={tickers[coin.askColor]}>
                      {coin.Ask}
                  </Typography>
                </Grid>
                <Grid item sm={4}>
                  <Typography type="body1" component="p" align="center">
                      Bid
                  </Typography>
                  <Typography type="body1" component="p" align="center" style={tickers[coin.bidColor]}>
                      {coin.Bid}
                  </Typography>
                </Grid>
                <Grid item sm={4}>
                  <Typography type="body1" component="p" align="center">
                      Last
                  </Typography>
                  <Typography type="body1" component="p" align="center" style={tickers[coin.lastColor]}>
                      {coin.Last}
                  </Typography>
                </Grid>
                <Grid item sm={4}>
                  <Typography type="body1" component="p" align="center">
                      Volume
                  </Typography>
                  <Typography type="body1" component="p" align="center" style={tickers[coin.volumeColor]}>
                      {coin.BaseVolume}
                  </Typography>
                </Grid>
                <Grid item sm={4}>
                  <Typography type="body1" component="p" align="center">
                      Buy Orders
                  </Typography>
                  <Typography type="body1" component="p" align="center" style={tickers[coin.buyColor]}>
                      {coin.OpenBuyOrders}
                  </Typography>
                </Grid>
                <Grid item sm={4}>
                  <Typography type="body1" component="p" align="center">
                      Sell Orders
                  </Typography>
                  <Typography type="body1" component="p" align="center" style={tickers[coin.sellColor]}>
                      {coin.OpenSellOrders}
                  </Typography>
                </Grid>
              </Grid>
          :
          <Grid item sm={12} style={{padding:'0px 0px 0px 8px', margin:'-16px -8px 0px 0px', overflowY:'visible'}}>
      				<Chart type='hybrid' data={this.state.data}/>
          </Grid>
          }
        </Grid>
      </Paper>
    )
  }
}
DataCard.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(DataCard);
