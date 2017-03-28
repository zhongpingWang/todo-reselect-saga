import { createStore, compose, applyMiddleware } from 'redux'; // combineReducers
import { routerReducer,routerMiddleware } from 'react-router-redux';
import { hashHistory } from 'react-router';
import {combineReducers} from 'redux-immutable';
import Immutable from 'immutable';

 
import rootReducer from './reducers';
import DevTools from './DevTools';   
import createSagaMiddleware from 'redux-saga' 


 const middlewareRuoter=routerMiddleware(hashHistory);
 
const sagaMiddleware = createSagaMiddleware();

const finalCreateStore = compose(
  applyMiddleware(sagaMiddleware,middlewareRuoter),
  DevTools.instrument()
)(createStore);
 
const initialState = Immutable.Map();

const reducer = combineReducers(Object.assign({}, rootReducer, {
  routing: routerReducer,
})); 

export default function configureStore() {  
  // const store = finalCreateStore(reducer, initialState); 
  //  return  store
  
  return {
    ...finalCreateStore(reducer, initialState),
    runSaga: sagaMiddleware.run
  } 
 
}













// import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
// import { routerReducer,routerMiddleware } from 'react-router-redux';
// import { hashHistory } from 'react-router';

 
// import rootReducer from './reducers';
// import DevTools from './DevTools';   
// import createSagaMiddleware from 'redux-saga' 


//  const middlewareRuoter=routerMiddleware(hashHistory);
 
// const sagaMiddleware = createSagaMiddleware();

// const finalCreateStore = compose(
//   applyMiddleware(sagaMiddleware,middlewareRuoter),
//   DevTools.instrument()
// )(createStore);
 
// const reducer = combineReducers(Object.assign({}, rootReducer, {
//   routing: routerReducer,
// })); 

// export default function configureStore(initialState) {  
//   // const store = finalCreateStore(reducer, initialState); 
//   //  return  store
  
//   return {
//     ...finalCreateStore(reducer, initialState),
//     runSaga: sagaMiddleware.run
//   } 
 
// }

 