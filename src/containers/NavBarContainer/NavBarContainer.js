import React, { Component } from 'react';
import { AppContext } from '../AppContext';
import PropTypes from 'prop-types';
import { ACCESS_TOKEN } from '../../constants';
import { navigate } from '../../helpers';

import { NavBarComponent } from '../../components/NavBarComponent/NavBarComponent';

class NavBarContainer extends Component {
  state = {
    quickLinkShow: false,
  };

  getCurrentActiveLink = () => {
    const currentPath = this.props.currentPath || '/';
    return currentPath.split('/')[1];
  };

  onMouseEnter = () => {
    this.setState({ quickLinkShow: true });
  };

  onMouseLeave = () => {
    this.setState({ quickLinkShow: false });
  };

  onLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    navigate('/login');
  };

  render() {
    const { user } = this.context;
    const { quickLinkShow } = this.state;
    return (
      <NavBarComponent
        quickLinkShow={quickLinkShow}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        user={user}
        activeLink={this.getCurrentActiveLink()}
        onLogout={this.onLogout}
      />
    );
  }
}

NavBarContainer.contextType = AppContext;
NavBarContainer.propTypes = {
  currentPath: PropTypes.string,
};

export default NavBarContainer;
