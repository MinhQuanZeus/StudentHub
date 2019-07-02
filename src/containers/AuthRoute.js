/* eslint-disable react/prop-types */
import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { getUser } from '../helpers';

class AuthRoute extends Component {
  render() {
    if (!this.isAuthenticated()) {
      return <Redirect to="/login" />;
    }
    return <Fragment>{this.props.children}</Fragment>;
  }

  isAuthenticated = () => {
    const user = getUser();
    return !!user;
  };
}

export default AuthRoute;
