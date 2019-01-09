import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppContext } from '../AppContext';

import { TopBarComponent } from '../../components/TopBarComponent/TopBarComponent';

class TopBarContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { user } = this.context;

    return <TopBarComponent loginInformation={user} />;
  }
}

TopBarContainer.contextType = AppContext;

const mapStateToProps = state => {
  return {
    loginInformation: state.login.loginInformation
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopBarContainer);
