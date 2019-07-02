import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import ForgotPasswordContainer from './ForgotPasswordContainer/ForgotPasswordContainer';
import ApplicationContainer from './ApplicationContainer/ApplicationContainer';
import Loading from '../components/LoadingComponent';
import './App.scss';
import LoginComponent from '../components/LoginComponent/LoginComponent';
import AuthRoute from './AuthRoute';

import SuccessTeamContainer from './SuccessTeamContainer/SuccessTeamContainer';
import ClassTrackerContainer from './ClassTrackerContainer/ClassTrackerContainer';
import MyProfileContainer from './MyProfileContainer/MyProfileContainer';
import MilestoneContainer from './MilestoneContainer/MilestoneContainer';
import DegreeAuditContainer from './DegreeAuditContainer/DegreeAuditContainer';
import ChecklistContainer from './ChecklistContainer/ChecklistContainer';
import FlagsListContainer from './FlagsListContainer/FlagsListContainer';
import FlagManagerDetailsContainer from './FlagManagerDetailsContainer/FlagManagerDetailsContainer.js';
import CalendarContainer from './CalendarContainer/CalendarContainer';
import { history } from '../helpers';
import { Route } from 'react-router';

class App extends Component {
  render() {
    return (
      <div id="app">
        <Loading />
        <Router history={history}>
          <Route path="/login" exact component={LoginComponent} />
          <Route path="/forgot-password" exact component={ForgotPasswordContainer} />
          <Route path="/" component={AuthRoute}>
            <Route path="/" component={ApplicationContainer} />
            <Route path="/success-team" component={SuccessTeamContainer} />
            <Route path="/milestone" component={MilestoneContainer} />
            <Route component={DegreeAuditContainer} path="/degree-audit" />
            <Route component={ClassTrackerContainer} path="/class-tracker" />
            <Route component={MyProfileContainer} path="/my-profile" />
            <Route component={ChecklistContainer} path="/check-list" />
            <Route component={FlagsListContainer} exact path="/flags" />
            <Route component={FlagManagerDetailsContainer} path="/flags/:id" />
            <Route component={CalendarContainer} path="/calendar" />
          </Route>
        </Router>
      </div>
    );
  }
}

export default App;
