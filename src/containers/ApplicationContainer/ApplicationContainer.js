import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';

import SuccessTeamContainer from '../SuccessTeamContainer/SuccessTeamContainer';
import TopBarContainer from '../TopBarContainer/TopBarContainer';
import NavBarContainer from '../NavBarContainer/NavBarContainer';
import NotificationContainer from '../NotificationContainer/NotificationContainer';
import ClassTrackerContainer from '../ClassTrackerContainer/ClassTrackerContainer';
import MyProfileContainer from '../MyProfileContainer/MyProfileContainer';
import MilestoneContainer from '../MilestoneContainer/MilestoneContainer';
import DegreeAuditContainer from '../DegreeAuditContainer/DegreeAuditContainer';
import ChecklistContainer from '../ChecklistContainer/ChecklistContainer';
import FlagsListContainer from '../FlagsListContainer/FlagsListContainer';
import FlagManagerDetailsContainer from '../FlagManagerDetailsContainer/FlagManagerDetailsContainer.js';
import CalendarContainer from '../CalendarContainer/CalendarContainer';
import { AppContext } from '../AppContext';
import { history } from '../../helpers/history';
import { getUser, getAccessToken } from '../../helpers';
class ApplicationContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    const accessToken = getAccessToken();
    const user = getUser();

    if (!accessToken && !user) {
      history.push({
        pathname: '/login'
      });
      return;
    }
    user.student.x_access_token = accessToken;
    this.user = user.student;
  }

  render() {
    const currentPath = this.props.location.pathname;
    const hideNotification = ['/check-list'];
    let notification = <NotificationContainer />;

    if (currentPath === '/') {
      return <Redirect to={{ pathname: '/my-profile' }} />;
    }

    if (hideNotification.includes(currentPath)) {
      notification = null;
    }
    return (
      <AppContext.Provider value={{ user: this.user }}>
        <TopBarContainer />
        <NavBarContainer />
        <Route path="/success-team" component={SuccessTeamContainer} />
        <Route path="/milestone" component={MilestoneContainer} />
        <Route path="/degree-audit" component={DegreeAuditContainer} />
        <Route path="/class-tracker" component={ClassTrackerContainer} />
        <Route path="/my-profile" component={MyProfileContainer} />
        <Route path="/check-list" component={ChecklistContainer} />
        <Route exact path="/flags" component={FlagsListContainer} />
        <Route path="/flags/:id" component={FlagManagerDetailsContainer} />
        <Route path="/calendar" component={CalendarContainer} />
        {notification}
      </AppContext.Provider>
    );
  }
}

export default ApplicationContainer;
