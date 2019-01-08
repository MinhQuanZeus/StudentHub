import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { history } from '../helpers/history';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import LoginContainer from './LoginContainer/LoginContainer';
import ForgotPasswordContainer from './ForgotPasswordContainer/ForgotPasswordContainer';
import ApplicationContainer from './ApplicationContainer/ApplicationContainer';
import LoadingContainer from './LoadingContainer';
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="app">
        <LoadingContainer />
        <Router history={history}>
          <Switch>
            <Route path="/login" component={LoginContainer} />
            <Route
              path="/forgot-password"
              component={ForgotPasswordContainer}
            />
            <PrivateRoute path="/" component={ApplicationContainer} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
