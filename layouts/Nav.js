import React from 'react';
import { Link } from 'react-router';

export default class Nav extends React.Component {
  render() {
    return (
      <nav>
        <Link activeClassName="ss" className="item" to="/">Home</Link>
        <Link activeClassName="ss" className="item" to="/book">Book</Link>
      </nav>
    );
  }
}
