import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { routerReducer } from 'react-router-redux';
import { hashHistory } from 'react-router';
import rootReducer from './reducers'; 
import createSagaMiddleware from 'redux-saga'  


 
const sagaMiddleware = createSagaMiddleware();

const finalCreateStore = compose(
  applyMiddleware(sagaMiddleware) 
)(createStore);
 
const reducer = combineReducers(Object.assign({}, rootReducer, {
  routing: routerReducer,
})); 

export default function configureStore(initialState) {  
  // const store = finalCreateStore(reducer, initialState); 
  //  return {
  // 	runSaga: sagaMiddleware.run,
  // 	store
  // };

  return {
    ...finalCreateStore(reducer, initialState),
    runSaga: sagaMiddleware.run
  }
  
}
