import React, { Component } from 'react';
import TopBarContainer from '../TopBarContainer/TopBarContainer';
import NavBarContainer from '../NavBarContainer/NavBarContainer';
import NotificationContainer from '../NotificationContainer/NotificationContainer';
import { AppContext } from '../AppContext';
import { getUser, getAccessToken } from '../../helpers';
import { Redirect } from 'react-router';
import { navigate } from '../../helpers';

class ApplicationContainer extends Component {
  componentWillMount() {
    const accessToken = getAccessToken();
    const user = getUser();

    if (!accessToken && !user) {
      navigate('/login');
      return;
    }
    user.student.x_access_token = accessToken;
    this.user = user.student;
    this.accessToken = accessToken;
  }

  render() {
    const currentPath = this.props.location.pathname;
    const hideNotification = ['/check-list'];
    let notification = <NotificationContainer />;

    if (currentPath === '/') {
      return <Redirect from={this.props.location.pathname} to="/my-profile" noThrow />;
    }

    if (hideNotification.includes(currentPath)) {
      notification = null;
    }
    return (
      <AppContext.Provider value={{ user: this.user, accessToken: this.accessToken }}>
        <TopBarContainer />
        <NavBarContainer />
        {this.props.children}
        {notification}
      </AppContext.Provider>
    );
  }
}

export default ApplicationContainer;
