import React, { Component, PropTypes } from 'react'
require('./less/app.less')

export default class AddTodo extends Component {
  render() {
    return (
      <div className="addTodoBox">
        <input type='text' ref='input' onKeyUp={(e) => this.handlekeyUp(e)} />
        <button onClick={(e) => this.handleClick(e)}>
          Add
        </button>
      </div>
    )
  }

  handlekeyUp(e){
      if (e.keyCode==13) {
         this.handleClick(e);
      }
  }

  handleClick(e) {
    const node = this.refs.input
    const text = node.value.trim()
    this.props.onAddClick(text)
    node.value = ''
  }
}

AddTodo.propTypes = {
  onAddClick: PropTypes.func.isRequired
}