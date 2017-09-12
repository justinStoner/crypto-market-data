const initialState={
  'BTC-ETH':{currency1:'BTC', currency2:'ETH', name:'BTC-ETH'},
  'ETH-OMG':{currency1:'ETH', currency2:'OMG', name:'ETH-OMG'},
  'ETH-NEO':{currency1:'ETH', currency2:'NEO', name:'ETH-NEO'},
  'ETH-ANT':{currency1:'ETH', currency2:'ANT', name:'ETH-ANT'},
  'ETH-PAY':{currency1:'ETH', currency2:'PAY', name:'ETH-PAY'},
  'USDT-ETH':{currency1:'USDT', currency2:'ETH', name:'USDT-ETH'},
  'USDT-BTC':{currency1:'USDT', currency2:'BTC', name:'USDT-BTC'}
}

export const filters = (state = initialState, action) => {
  let obj;
  switch (action.type) {
    case 'ADD_FILTER':
      obj = Object.assign({}, state );
      obj[action.payload.name] = action.payload;
      return obj;
      break;
    case 'REMOVE_FILTER':
      obj = Object.assign({}, state );
      delete obj[action.payload.name];
      return obj;
      break;
    default:
      return state;
  }
}
