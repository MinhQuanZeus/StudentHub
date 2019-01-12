import React, { Component } from 'react';
import { AppContext } from '../AppContext';

import { TopBarComponent } from '../../components/TopBarComponent/TopBarComponent';

class TopBarContainer extends Component {
  render() {
    const { user } = this.context;
    return <TopBarComponent loginInformation={user} />;
  }
}

TopBarContainer.contextType = AppContext;
export default TopBarContainer;
