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
          <Grid item sm={12}>
            <Typography type="subheading" component="p" align="left">
                {coin.MarketName}
                <span style={{paddingLeft:'10px', display:'inline-block', height:'32px'}}>
                  <img src={`https://files.coinmarketcap.com/static/img/coins/32x32/${filter.marketName.toLowerCase()}.png`} alt="" />
                </span>
                <IconButton onClick={ () => {this.props.removeCoin(this.props.filter) }} style={{float:'right'}}>
                  <CloseIcon/>
                </IconButton>
                <IconButton onClick={ () => {this.setState({chartActive:!this.state.chartActive})} }  style={ this.state.chartActive?{float:'right', color:'#2196f3'}:{float:'right'} }>
                  <ShowChartIcon/>
                </IconButton>
            </Typography>
          </Grid>
          {
            !this.state.chartActive?
              <Grid container>
                <Grid item sm={4}>
                  <p>Ask:</p>
                  <p style={tickers[coin.askColor]}>{coin.Ask}</p>
                </Grid>
                <Grid item sm={4}>
                  <p>Bid:</p>
                  <p style={tickers[coin.bidColor]}>{coin.Bid}</p>
                </Grid>
                <Grid item sm={4}>
                  <p>Last:</p>
                  <p style={tickers[coin.lastColor]}>{coin.Last}</p>
                </Grid>
                <Grid item sm={4}>
                  <p>Volume</p>
                  <p style={tickers[coin.volumeColor]}>{coin.BaseVolume}</p>
                </Grid>
                <Grid item sm={4}>
                  <p>Buy Orders</p>
                  <p style={tickers[coin.buyColor]}>{coin.OpenBuyOrders}</p>
                </Grid>
                <Grid item sm={4}>
                  <p>Sell Orders</p>
                  <p style={tickers[coin.sellColor]}>{coin.OpenSellOrders}</p>
                </Grid>
              </Grid>
          :
          <Grid item sm={12}>
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
