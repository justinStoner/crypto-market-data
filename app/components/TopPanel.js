// @flow weak

import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import Chip from 'material-ui/Chip'
import FaceIcon from 'material-ui-icons/Face';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton'
import TextField from 'material-ui/TextField';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import classnames from 'classnames';
const styles = theme => ({
  paper: {
    padding: 16,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  chip: {
    margin: theme.spacing.unit,
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  }
})

class TopPanel extends Component{
  constructor(props){
    super(props)
    this.state={
      isOpen:true,
      searchText:'',
      searching:false
    }
  }

  render(){
    const classes=this.props.classes
    return(
      <Paper className={classes.paper}>
        <Grid container>
          <Grid item sm={1} style={{paddingTop:'16px'}}>
            <Typography type="headline" component="h3" align="left">
              Coins
            </Typography>
          </Grid>
          <Grid item sm={7} style={{maxHeight:'64px', overflow:'hidden'}}>
          {
            !this.state.isOpen
            ?

              <div className={classes.row}>
                {Object.values(this.props.filters).map( (filter, index) => {
                  return (
                    <Chip
                      className={classes.chip}
                      style={{marginRight:'8px', cursor:'pointer'}}
                      key={index}
                      label={`${filter.name} | ${Math.round10(this.props.coins[filter.name].Last, -3)}`}
                    />
                  )
                })}
              </div>

            :
            null
          }
          </Grid>
          <Grid item sm={4} className="text-right">
            <TextField
              onChange={(e) => {this.setState({searchText:e.target.value})}}
              label="Search Coins"
              InputProps={{ placeholder: 'Search Coins' }}
              onFocus={()=>{this.setState({searching:!this.state.searching})}}
              value={this.state.searchText}
              onBlur={ () => {setTimeout( () =>{this.setState({searchText:'', searching:false})}, 300 )}}
              style={{padding:'0px'}}
              />
              <IconButton
                onClick={ () => {this.setState({isOpen:!this.state.isOpen})} }
                aria-expanded={this.state.isOpen}
                aria-label="Show more"
                className={classnames(classes.expand, {
                [classes.expandOpen]: !this.state.isOpen,
              })}
              >
                <ExpandMoreIcon/>
              </IconButton>
          </Grid>
          {
            this.props.currencies && this.props.coins && this.state.isOpen
            ?
            <div className={classes.row}>
              {
                Object.values(this.props.filters).map( (filter, index) => {
                  return (
                    <Chip
                      className={classes.chip}
                      style={{marginRight:'16px', cursor:'pointer'}}
                      key={index}
                      onRequestDelete={ () => {this.props.removeCoin(filter)} }
                      label={`${filter.name} | ${Math.round10(this.props.coins[filter.name].Last, -3)}`}
                      avatar={
                        <Avatar src={ `https://files.coinmarketcap.com/static/img/coins/32x32/${filter.currencyLong.toLowerCase()}.png`} />
                      }
                    />
                  )
                })
              }
            </div>
            :
            null
          }
          {
            this.state.searching && this.state.isOpen && this.state.searchText.length
            ?
            <div className={classes.row}>
              {
                Object.values(this.props.coins).filter( (coin, index) =>{
                  return coin.MarketName.indexOf(this.state.searchText.toUpperCase()) > -1 && this.state.searchText.length && !this.props.filters[coin.MarketName]
                }).map( (coin, index) => {
                  return (
                    <Chip
                      style={{marginRight:'16px'}}
                      className={classes.chip}
                      key={index} onClick={ () => {this.props.addCoin(coin)} }
                      label={`${coin.MarketName} | ${coin.Last}`}
                    />
                  )
                })
              }
            </div>
            :
            null
          }
        </Grid>
      </Paper>
    )
  }
}
TopPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(TopPanel);
