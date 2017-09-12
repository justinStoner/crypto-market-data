// @flow

import React, { Component } from 'react';
//import { Grid, Cell, Card, CardTitle, CardText, CardActions, CardMenu, Chip, ChipContact, IconButton, Textfield } from 'react-mdl';
//import openSocket from 'socket.io-client';
import Grid from 'material-ui/Grid'
import TopPanel from './TopPanel.js';
import DataCard from './DataCard';
import {ipcRenderer} from 'electron';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';

// const Store = require('electron-store');
//
// const store = new Store();
const colorNames = [
  ['Ask', 'askColor'],
  ['Bid', 'bidColor'],
  ['Last', 'lastColor'],
  ['BaseVolume', 'volumeColor'],
  ['OpenBuyOrders', 'buyColor'],
  ['openSocket', 'sellColor']
]
const defaultFilters = {
  'BTC-ETH':{currency1:'BTC', currency2:'ETH', name:'BTC-ETH', marketName:'ethereum'},
  'ETH-OMG':{currency1:'ETH', currency2:'OMG', name:'ETH-OMG', marketName:'omisego'},
  'ETH-NEO':{currency1:'ETH', currency2:'NEO', name:'ETH-NEO', marketName:'neo'},
  'ETH-ANT':{currency1:'ETH', currency2:'ANT', name:'ETH-ANT', marketName:'aragon'},
  'ETH-PAY':{currency1:'ETH', currency2:'PAY', name:'ETH-PAY', marketName:'tenx'},
  'USDT-ETH':{currency1:'USDT', currency2:'ETH', name:'USDT-ETH', marketName:'ethereum'},
  'USDT-BTC':{currency1:'USDT', currency2:'BTC', name:'USDT-BTC', marketName:'bitcoin'}
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 8,
    paddingTop:8,
    paddingLeft:16,
    paddingRight:16,
    paddingBottom:16
  },
  progress:{
    margin: '0 auto'
  }
});

class Home extends Component{
  constructor(props){
    super(props);
    var filters;

    this.state={
      filters:defaultFilters,
      searchText:'',
      searching:false,
      coinPickerOpen:true,
      loaded:false
    }


    this.removeCoin=this.removeCoin.bind(this);
    this.addCoin=this.addCoin.bind(this)
  }

  componentDidMount(){
    try{
      ipcRenderer.on('currencyData', (evt, data)=>{
          try{
            console.log(data);
            if(data.success) this.setState({currencies:mapCurrencies(data.result.filter( item => item.IsActive))});
          }catch(e){
            console.log(e);
          }
      })

      ipcRenderer.on('marketData', (evt, data)=>{
          //console.log(data)
          if(data.success) this.setState({coins:{...splitArray(data.result, this.state)}});
          if(!this.state.loaded) this.setState({loaded:true})
        //console.log(data.result);
      })
    }
    catch(e){
      console.log(e);
      console.log('error adding listenerse');
    }
    ipcRenderer.send('getPrices')
  }
  render(){
    const classes=this.props.classes
    return (
      <div className={classes.root}>
        <Grid container className="text-center">
          <Grid item xs={12} className="text-left">
            <TopPanel coins={this.state.coins} currencies={this.state.currencies} filters={this.state.filters} addCoin={this.addCoin} removeCoin={ (filter) => {this.removeCoin(filter, this.state)}}></TopPanel>
          </Grid>
          {
            this.state.coins && this.state.currencies?
            Object.values(this.state.filters).map( (filter, index) => {
              return (
                <Grid item xs={4} sm={3} key={index}>
                  <DataCard currencies={this.state.currencies} coins={this.state.coins} filter={filter} removeCoin={(filter) => {this.removeCoin(filter, this.state)}}></DataCard>
                </Grid>
              )
            })
            :
              !this.state.loaded
              ?
              <CircularProgress className={classes.progress} />
              :
              null
          }
        </Grid>
      </div>
    )
  }
  addCoin(coin){
    var newFilter = {};
    var filters;
    newFilter[coin.MarketName] = {
      name:coin.MarketName,
      currency1:coin.MarketName.substr(0, coin.MarketName.indexOf('-')-1),
      currency2:coin.MarketName.substr(coin.MarketName.indexOf('-')+1, coin.MarketName.length+1),
      marketName:coin.MarketName
    }
    filters = Object.assign( {}, newFilter, this.state.filters );
    console.log(filters);
    //store.set('filters', filters);
    this.setState({ filters });
  }
  removeCoin = (filter, state) => {
    var filters = Object.assign( {}, state.filters );
    delete filters[filter.name];
    //store.set('filters', filters);
    this.setState( { filters: filters } )
  }
}

const spliceCoin = ( coins, filter ) =>{
  var filteredCoins = Object.assign( {}, coins );
  delete filteredCoins[filter.name];
  return filteredCoins;
}

const mapCurrencies = (arr) => {
  var obj = {};
  for ( var i in arr ){
    obj[arr[i].Currency] = arr[i];
  }
  return obj
}
const splitArray = (data, state) => {
  var obj={}
  var current;
  for ( var i in data ) {
    current=data[i];
    //console.log(current);
    obj[current.MarketName] = current;
    if( state.filters[current.MarketName] ) {
      if( state.coins ) {
        colorNames.forEach( color => {
          if( obj[current.MarketName][color[0]] > state.coins[current.MarketName][color[0]] ) {
            obj[current.MarketName][color[1]]='tickerGreen';
          }else if( obj[current.MarketName][color[0]] < state.coins[current.MarketName][color[0]] ) {
            obj[current.MarketName][color[1]]='tickerRed';
          }else{
            obj[current.MarketName][color[1]]=state.coins[current.MarketName][color[1]] || '';
          }
        })
      }
    }
  }
  return obj;
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
