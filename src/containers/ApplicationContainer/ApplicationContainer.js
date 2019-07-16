/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import TopBarContainer from '../TopBarContainer/TopBarContainer';
import NavBarContainer from '../NavBarContainer/NavBarContainer';
import NotificationContainer from '../NotificationContainer/NotificationContainer';
import { AppContext } from '../AppContext';
import { getUser, getAccessToken } from '../../helpers';
import { Redirect, Route } from 'react-router';
import { history, navigate } from '../../helpers';
import SuccessTeamContainer from '../SuccessTeamContainer/SuccessTeamContainer';
import ClassTrackerContainer from '../ClassTrackerContainer/ClassTrackerContainer';
import MilestoneContainer from '../MilestoneContainer/MilestoneContainer';
import DegreeAuditContainer from '../DegreeAuditContainer/DegreeAuditContainer';
import ChecklistContainer from '../ChecklistContainer/ChecklistContainer';
import FlagsListContainer from '../FlagsListContainer/FlagsListContainer';
import FlagManagerDetailsContainer from '../FlagManagerDetailsContainer/FlagManagerDetailsContainer.js';
import CalendarContainer from '../CalendarContainer/CalendarContainer';
import MyProfileContainer from '../MyProfileContainer';

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
    const hideNotification = ['/check-list'];
    let notification = <NotificationContainer />;

    if (currentPath === '/') {
      return <Redirect to="/my-profile" />;
    }

    if (hideNotification.includes(currentPath)) {
      notification = null;
    }
    return (
      <AppContext.Provider value={{ user: this.user, accessToken: this.accessToken }}>
        <TopBarContainer />
        <NavBarContainer />
        <Route path="/success-team" component={SuccessTeamContainer} />
        <Route path="/milestone" component={MilestoneContainer} />
        <Route component={DegreeAuditContainer} path="/degree-audit" />
        <Route component={ClassTrackerContainer} path="/class-tracker" />
        <Route component={MyProfileContainer} path="/my-profile" />
        <Route component={ChecklistContainer} path="/check-list" />
        <Route component={FlagsListContainer} exact path="/flags" />
        <Route component={FlagManagerDetailsContainer} path="/flags/:id" />
        <Route component={CalendarContainer} path="/calendar" />
        {notification}
      </AppContext.Provider>
    );
  }
}

export default ApplicationContainer;
