import React, { Component } from 'react';
import { connect } from 'react-redux';
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
import PendingFlags from '../../components/FlagsListComponents/PendingFlags';
import TabsComponent from '../../components/FlagsListComponents/TabsComponent';
import FlagsListSearchAndAdd from '../../components/FlagsListComponents/FlagsListSearchAndAdd';
import FlagsTable from '../../components/FlagsListComponents/FlagsTable';

import * as actions from '../../actions/FlagsListActions/FlagsListActions';

import sharedStyles from '../../styles/styles.css';


class FlagsListContainer extends Component {
  state = {
    showPending: true,
    pendingBtnLabel: 'Hide Pending',
    activeTab: 0,
  }

  togglePendingVisibility = () => {
    const label = !this.state.showPending ? 'Hide Pending' : 'Show Pending';
    this.setState({
      showPending: !this.state.showPending,
      pendingBtnLabel: label,
    });
  }

  updateActiveTab = (idx) => {
    this.setState((prevState) => {
      if (prevState.activeTab !== idx) {
        return { activeTab: idx }
      }
    })
  }

  getHeaderLabelsByActiveTab = () => {
    let headerLabels = ['Flag', 'From', 'Title', 'Category', 'Sub Cat', 'Date Created', 'Status', 'Severity', 'Priority'];

    if (this.state.activeTab === 0) {
      return headerLabels;
    }

    headerLabels[1] = 'To';
    return headerLabels;
  }

  getFlagsByActiveTab = () => {
    const { flagsReceived, flagsSent } = this.props;
    let flags;

    if (this.state.activeTab === 0) {
      flags = flagsReceived;
    } else {
      flags = flagsSent;
    }

    return flags;
  }

  componentDidMount() {
    const token = this.props.login.x_access_token;
    this.props.getFlagsList(token);
  }

  render() {
    const { showPending, pendingBtnLabel, activeTab } = this.state;
    const { flagsList } = this.props;
    const pendingFlags = showPending ? <PendingFlags flags={flagsList.flagsList} /> : null;
    const searchAndAdd = activeTab === 0 ? <FlagsListSearchAndAdd /> : null;
    const headerLabels = this.getHeaderLabelsByActiveTab();
    const flags = this.getFlagsByActiveTab();

    if (flagsList.loading) { return null }

    return (
      <section className={sharedStyles["content-container"]}>
        <HeaderComponent label='Flags List' btnLabel={pendingBtnLabel} clickFxn={this.togglePendingVisibility} />
        {pendingFlags}
        <TabsComponent activeTab={activeTab} updateActiveTab={this.updateActiveTab} tabNames={['Flags', 'Sent']}>
          <section>
            {searchAndAdd}
            <FlagsTable headerLabels={headerLabels} flags={flags} />
          </section>
        </TabsComponent>
      </section>
    )
  }
}

function mapStateToProps(state) {
  return {
    login: state.login.loginInformation,
    flagsList: state.flagsList, // all flags in user account: received and sent
    flagsReceived: state.flagsList.flagsList.filter((flag) => flag.created_by !== state.login.loginInformation.id), // flags received by user only
    flagsSent: state.flagsList.flagsList.filter((flag) => flag.created_by === state.login.loginInformation.id), // user sent flags only
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getFlagsList: (x_access_token) => dispatch(actions.getFlagsList(x_access_token)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FlagsListContainer);
