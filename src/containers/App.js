import React, { Component } from 'react';
import { Router, Switch } from 'react-router-dom';
import ForgotPasswordContainer from './ForgotPasswordContainer/ForgotPasswordContainer';
import ApplicationContainer from './ApplicationContainer/ApplicationContainer';
import Loading from '../components/LoadingComponent';
import './App.scss';
import LoginComponent from '../components/LoginComponent/LoginComponent';
import AuthRoute from './AuthRoute';

import { history } from '../helpers';
import { Route } from 'react-router';

class App extends Component {
  render() {
    return (
      <div id="app">
        <Loading />
        <Router history={history}>
          <Switch>
            <Route path="/login" exact component={LoginComponent} />
            <Route path="/forgot-password" exact component={ForgotPasswordContainer} />
            <Route path="/" component={AuthRoute}>
              <Route path="/" component={ApplicationContainer} />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
