import { createSelector } from 'reselect';
import { VisibilityFilters } from '../actions';

function selectTodos(todos, filter) {
  switch (filter) {
  case VisibilityFilters.SHOW_ALL:
    return todos;
  case VisibilityFilters.SHOW_COMPLETED:
    return todos.filter(todo => todo.completed);
  case VisibilityFilters.SHOW_ACTIVE:
    return todos.filter(todo => !todo.completed);
  }
}

const visibilityFilterSelector = (state) => state.toJS().visibilityFilter;
const todosSelector = (state) => state.toJS().todos;
const counter =(state) => state.toJS().counter;
const LoginData= (state) => state.toJS().LoginData;

export const visibleTodosSelector = createSelector(
  [visibilityFilterSelector, todosSelector,counter,LoginData],
  (visibilityFilter, todos,counter,LoginData) => {
    return {
      visibleTodos: selectTodos(todos, visibilityFilter),
      visibilityFilter,
      counter,
      LoginData
    };
  }
);