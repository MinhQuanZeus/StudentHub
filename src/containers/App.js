import React, { Component } from 'react';
import { Router } from '@reach/router';
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

class App extends Component {
  render() {
    return (
      <div id="app">
        <Loading />
        <Router>
          <LoginComponent path="/login" exact />
          <ForgotPasswordContainer path="/forgot-password" exact />
          <AuthRoute path="/">
            <ApplicationContainer path="/">
              <SuccessTeamContainer path="/success-team" />
              <MilestoneContainer path="/milestone" />
              <DegreeAuditContainer path="/degree-audit" />
              <ClassTrackerContainer path="/class-tracker" />
              <MyProfileContainer path="/my-profile" />
              <ChecklistContainer path="/check-list" />
              <FlagsListContainer exact path="/flags" />
              <FlagManagerDetailsContainer path="/flags/:id" />
              <CalendarContainer path="/calendar" />
            </ApplicationContainer>
          </AuthRoute>
        </Router>
      </div>
    );
  }
}

export default App;
