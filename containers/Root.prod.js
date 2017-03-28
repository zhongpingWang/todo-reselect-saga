import React, { Component } from 'react';
import { Provider } from 'react-redux';
import App from '../components/App'; 
import routes from '../routes';

export default class Root extends Component {
  render() {
    const { store,history } = this.props;
    return (
      <Provider store={store}> 
         {routes(history)}
      </Provider>
    );
  }
} 