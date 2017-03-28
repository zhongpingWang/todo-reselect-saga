import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { immutableRenderDecorator } from 'react-immutable-render-mixin';

import { addTodo, completeTodo, setVisibilityFilter, VisibilityFilters } from '../actions'
import AddTodo from './AddTodo'
import TodoList from './TodoList'
import Footer from './Footer' 
import { visibleTodosSelector } from '../selectors/todoSelectors'
import { is } from 'immutable'; 


import {push} from 'react-router-redux'


require('./less/index.less')

import img from '../images/bg/2.jpg'

 
@immutableRenderDecorator
class App extends Component {

  addTodo(text){
      const { dispatch} = this.props 
      dispatch(addTodo(text)) 
  }




  render() {
    // Injected by connect() call:
    const { dispatch, visibleTodos, visibilityFilter,counter} = this.props 
    
    return (
      <div className="todoBox">
         <span onClick={e=>dispatch(push('/book'))}>go to book</span>
        <AddTodo
          onAddClick={ text => dispatch(addTodo(text)) } />

          <span onClick={e=>dispatch({type:"INCREMENT2"})}>add</span>
          {counter.count}
        
        <TodoList
          todos={visibleTodos}
          onTodoClick={index =>
            dispatch(completeTodo(index))
          } />
        <Footer
          filter={visibilityFilter}
          onFilterChange={nextFilter =>
            dispatch(setVisibilityFilter(nextFilter))
          } /> 
      </div>
    )
  }
}

App.propTypes = {
  visibleTodos: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired
  }).isRequired).isRequired,
  visibilityFilter: PropTypes.oneOf([
    'SHOW_ALL',
    'SHOW_COMPLETED',
    'SHOW_ACTIVE'
  ]).isRequired
}

function selectTodos(todos, filter) {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return todos
    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter(todo => todo.completed)
    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter(todo => !todo.completed)
  }
}

// Which props do we want to inject, given the global state?
// Note: use https://github.com/faassen/reselect for better performance.
function select(state) {
  return {
    visibleTodos: selectTodos(state.todos, state.visibilityFilter),
    visibilityFilter: state.visibilityFilter
  }
}

// 包装 component ，注入 dispatch 和 state 到其默认的 connect(select)(App) 中；
//export default connect(select)(App)

export default connect(visibleTodosSelector)(App)