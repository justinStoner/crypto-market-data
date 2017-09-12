// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import counter from './counter';
import { filters } from './filters'

const rootReducer = combineReducers({
  counter,
  router,
  filters
});

export default rootReducer;
