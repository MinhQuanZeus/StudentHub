import React, { Component, Fragment } from 'react';
import { Redirect } from '@reach/router';
import { getUser } from '../helpers';

class AuthRoute extends Component {
  render() {
    const { location } = this.props;
    if (!this.isAuthenticated()) {
      return <Redirect from={location.pathname} to="/login" noThrow />;
    }
    return <Fragment>{this.props.children}</Fragment>;
  }

  isAuthenticated = () => {
    const user = getUser();
    return !!user;
  };
}

export default AuthRoute;
