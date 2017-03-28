import React, { Component } from 'react';
import { Provider } from 'react-redux';
import App from '../components/App';
import DevTools from '../redux/DevTools';
import routes from '../routes';

 

export default class Root extends Component {
  render() {
    const { store, history} = this.props;
    return (
      <Provider store={store}>
        <div>
          {routes(history)}
          <DevTools />
        </div>
      </Provider>
    );
  }
}