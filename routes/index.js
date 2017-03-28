import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import Frame from '../layouts/Frame'

import App from '../components/App';
import Book from '../components/Books'; 
 

const routes = browserHistory => (
  <Router history={browserHistory}>
    <Route path="/" component={Frame}>
    	<IndexRoute component={App} /> 
    	<Route path="book" component={Book} />
    </Route>
  </Router>
);

export default routes;
