/*eslint-disable no-unused-vars*/
import "babel-polyfill" 
import React from 'react'
import { render } from 'react-dom' 
import Root from './containers/Root';  
import configureStore from './redux/configureStore';
import rootSaga from './sagas/index'
import { hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';


let store = configureStore(); 
const history = syncHistoryWithStore(hashHistory, store,{
  selectLocationState (state) { 
      return  state.get('routing')//.toJS();
  }
}); 
 
store.runSaga(rootSaga);


render(
 <Root store={ store } history={history} />,
  document.getElementById('root'));

 