/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import TopBarContainer from '../TopBarContainer/TopBarContainer';
import NavBarContainer from '../NavBarContainer/NavBarContainer';
import NotificationContainer from '../NotificationContainer';
import { AppContext } from '../AppContext';
import { getUser, getAccessToken } from '../../helpers';
import { Redirect, Route, Switch } from 'react-router';
import { history, navigate } from '../../helpers';
import SuccessTeamContainer from '../SuccessTeamContainer/SuccessTeamContainer';
import ClassTrackerContainer from '../ClassTrackerContainer/ClassTrackerContainer';
import MilestoneContainer from '../MilestoneContainer/MilestoneContainer';
import DegreeAuditContainer from '../DegreeAuditContainer/DegreeAuditContainer';
import ChecklistContainer from '../ChecklistContainer/ChecklistContainer';
import FlagsListContainer from '../FlagsListContainer/FlagsListContainer';
import FlagDetailsContainer from '../FlagDetailsContainer';
import MyProfileContainer from '../MyProfileContainer';
import css from './ApplicationContainer.m.scss';
import CalendarContainer from '../CalendarContainer';

class ApplicationContainer extends Component {
  componentWillMount() {
    const accessToken = getAccessToken();
    const user = getUser();

    if (!accessToken || !user) {
      navigate('/login');
      return;
    }
    user.student.x_access_token = accessToken;
    this.user = user.student;
    this.accessToken = accessToken;
  }

  render() {
    const currentPath = history.location.pathname;

    if (currentPath === '/') {
      return <Redirect to="/my-profile" />;
    }

    return (
      <AppContext.Provider value={{ user: this.user, accessToken: this.accessToken }}>
        <TopBarContainer />
        <div className={css.ApplicationContainer}>
          <NavBarContainer />
          <Switch>
            <Route path="/success-team" component={SuccessTeamContainer} />
            <Route path="/milestone" component={MilestoneContainer} />
            <Route component={DegreeAuditContainer} path="/degree-audit" />
            <Route component={ClassTrackerContainer} path="/class-tracker" />
            <Route component={MyProfileContainer} path="/my-profile" />
            <Route component={ChecklistContainer} path="/check-list" />
            <Route component={FlagsListContainer} exact path="/flags" />
            <Route component={FlagDetailsContainer} path="/flags/:id" />
            <Route component={CalendarContainer} path="/calendar" />
          </Switch>
          {currentPath !== '/check-list' && <NotificationContainer />}
        </div>
      </AppContext.Provider>
    );
  }
}

export default ApplicationContainer;
