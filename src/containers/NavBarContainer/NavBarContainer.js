/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { AppContext } from '../AppContext';

import { NavBarComponent } from '../../components/NavBarComponent/NavBarComponent';

class NavBarContainer extends Component {
  getCurrentActiveLink = () => {
    const currentPath = this.props.currentPath || '/';
    return currentPath.split('/')[1];
  };

  render() {
    const { user } = this.context;
    return <NavBarComponent user={user} activeLink={this.getCurrentActiveLink()} />;
  }
}

NavBarContainer.contextType = AppContext;
export default NavBarContainer;
