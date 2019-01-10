import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { history } from '../helpers/history';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import LoginContainer from './LoginContainer/LoginContainer';
import ForgotPasswordContainer from './ForgotPasswordContainer/ForgotPasswordContainer';
import ApplicationContainer from './ApplicationContainer/ApplicationContainer';
import Loading from '../components/LoadingComponent';
import { getAccessToken, getUser } from '../helpers';
import { withEmit } from 'react-emit';
import { AppContext } from './AppContext';
import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    const accessToken = getAccessToken();
    const user = getUser();
    if (accessToken && user) {
      user.student.x_access_token = accessToken;
    }
    this.user = user.student;
    this.state = {
      isLoading: false
    };
    this.showLoading = this.showLoading.bind(this);
    this.hideLoading = this.hideLoading.bind(this);
  }

  componentDidMount() {
    this.props.on('SHOW_LOADING', this.showLoading);
    this.props.on('HIDE_LOADING', this.hideLoading);
  }

  componentWillUnmount() {
    this.props.off('SHOW_LOADING', this.showLoading);
    this.props.off('HIDE_LOADING', this.hideLoading);
  }

  showLoading() {
    this.setState(state => ({
      isLoading: true
    }));
  }

  hideLoading() {
    this.setState(state => ({
      isLoading: false
    }));
  }

  render() {
    return (
      <AppContext.Provider value={{ user: this.user }}>
        <Loading isLoading={this.state.isLoading} />
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
      </AppContext.Provider>
    );
  }
}

export default withEmit(App);
