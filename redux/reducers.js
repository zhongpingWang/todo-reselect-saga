import { combineReducers } from 'redux'
import Immutable from 'Immutable'


import * as actions from '../actions/index'
const { ADD_TODO, COMPLETE_TODO, SET_VISIBILITY_FILTER, VisibilityFilters } = actions


const { SHOW_ALL } = VisibilityFilters

function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}

function todos(state = [], action) {

  //todos[action.type](state,action);

  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ]
    case COMPLETE_TODO:
      return [
        ...state.slice(0, action.index),
        Object.assign({}, state[action.index], {
          completed: true
        }),
        ...state.slice(action.index + 1)
      ]
    default:
      return state
  }
}

todos[ADD_TODO]=function(){
 
}

todos[COMPLETE_TODO]=function(){
  
}

// list = list.update(
//   list.findIndex(function(item) { 
//     return item.get("name") === "third"; 
//   }), function(item) {
//     return item.set("count", 4);
//   }
// );

 
function counter(state = Immutable.Map({count:1,my:[{key:1},{key:2}]}), action) {
  switch (action.type) {
    case 'INCREMENT': 
      //return  state.set("count",state.toJS().count+1); 
      state= state.update("count",count=>count+1);

      return state.update("my",x=>{
        x.map(item=>{
           if (item.key==1) {
            item.z=3;
           }
        });
       
        return x;
      }); 

     
    // case 'DECREMENT':
    //   return {count:state.count - 1}
    default:
      return state
  }
}



function LoginData(state = Immutable.Map({ isFetching: false,
  items: []}), action) {

  switch (action.type) {
    case actions.REQUEST_POSTS: 
      return state.set("isFetching",true);
      //return { ...state, isFetching: true }

    case actions.RECEIVE_POSTS:

      state=state.set("isFetching",false);
      //state=state.update("lastUpdated",action.receivedAt);
      state=state.set("items",action.posts);
      return state;
      // return { ...state,
      //   isFetching: false,
      //   items: action.posts,
      //   lastUpdated: action.receivedAt
      // }
    default:
      return state
  }
}

import routerReducer from './routerReducer'


const todoApp = {
  visibilityFilter,
  todos,
  counter,
  LoginData,
  routerReducer
}

export default todoApp