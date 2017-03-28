import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { immutableRenderDecorator } from 'react-immutable-render-mixin';

import { bookSelector } from '../selectors/bookSelectors'
import * as actions from '../actions/index'  

@immutableRenderDecorator
class Books extends Component {
  render() { 
    console.log(this.props.LoginData.items)
    return (
      <ul>
      	<li onClick={ () =>this.props.dispatch(actions.invalidateReddit({text:2323}))}>刷新</li>
        {this.props.LoginData.items.map((post, i) =>
          <li key={i}>{post.title}</li>
        )}
      </ul>
    )
  }
} 
export default connect(bookSelector)(Books)