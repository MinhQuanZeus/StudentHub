import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { getUser } from '../helpers';

class AuthRoute extends Component {
  render() {
    const { component, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={props =>
          this.isAuthenticated() ? (
            React.createElement(component, props)
          ) : (
            <Redirect
              to={{ pathname: '/login', state: { from: props.location } }}
            />
          )
        }
      />
    );
  }

  isAuthenticated = () => {
    const user = getUser();
    if (!user) {
      return false;
    }
    const unixTime = Math.floor(new Date().getTime() / 1000);
    return user.exp > unixTime;
  };
}

export default AuthRoute;
