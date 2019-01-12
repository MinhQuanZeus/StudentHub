import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { history } from '../helpers/history';
import ForgotPasswordContainer from './ForgotPasswordContainer/ForgotPasswordContainer';
import ApplicationContainer from './ApplicationContainer/ApplicationContainer';
import Loading from '../components/LoadingComponent';
import './App.scss';
import LoginComponent from '../components/LoginComponent/LoginComponent';
import AuthRoute from './AuthRoute';

class App extends Component {
  render() {
    return (
      <div id="app">
        <Loading />
        <Router history={history}>
          <Switch>
            <Route path="/login" component={LoginComponent} />
            <Route
              path="/forgot-password"
              component={ForgotPasswordContainer}
            />
            <AuthRoute path="/" component={ApplicationContainer} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
