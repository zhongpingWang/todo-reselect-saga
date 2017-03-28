import { combineReducers } from 'redux'
import { ADD_TODO, COMPLETE_TODO, SET_VISIBILITY_FILTER, VisibilityFilters } from './actions'
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



function counter(state = {count:0}, action) {
  switch (action.type) {
    case 'INCREMENT':
      return {count:state.count + 1} 
    // case 'DECREMENT':
    //   return {count:state.count - 1}
    default:
      return state
  }
}



const todoApp = combineReducers({
  visibilityFilter,
  todos,
  counter
})

export default todoApp