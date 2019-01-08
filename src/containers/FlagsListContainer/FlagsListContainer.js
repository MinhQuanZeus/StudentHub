import React, { Component } from 'react';
import { connect } from 'react-redux';
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
import PendingFlags from '../../components/FlagsListComponents/PendingFlags';
import TabsComponent from '../../components/FlagsListComponents/TabsComponent';
import FlagsListSearchAndAdd from '../../components/FlagsListComponents/FlagsListSearchAndAdd';
import FlagsTable from '../../components/FlagsListComponents/FlagsTable';
import { createFilter } from 'react-search-input';

import * as actions from '../../actions/FlagsListActions/FlagsListActions';

import sharedStyles from '../../styles/styles.module.css';
import styles from './FlagsListContainer.module.css';


const KEYS_TO_FILTERS = ['id', 'created_by', 'subject', 'category', 'sub_category', 'status', 'severity', 'created_at', 'priority'];

class FlagsListContainer extends Component {
  state = {
    showPending: true,
    pendingBtnLabel: 'Hide Pending',
    activeTab: 0,
    showModal: false,
    flagDetailsModal: {},
    search: '',
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
        return { activeTab: idx, search: '' }
      }
    })
  }

  getHeaderLabelsByActiveTab = () => {
    let headerLabels = ['Flag', 'From', 'Title', 'Category', 'Sub Cat', 'Date Created', 'Status', 'Severity', 'Priority'];

    switch (this.state.activeTab) {
      case 1:
        headerLabels[1] = 'To';
        return headerLabels;
      case 2:
        headerLabels.splice(1, 1);
        return headerLabels;
      default:
        return headerLabels;
    }
  }

  getFlagsByActiveTab = () => {
    const { flagsList, sentFlags, publicFlags } = this.props;
    let flags;

    switch (this.state.activeTab) {
      case 1:
        flags = sentFlags;
        break;
      case 2:
        flags = publicFlags;
        break;
      default:
        flags = this.getFlagsList(flagsList);
    }

    return flags;
  }

  getFlagsList = (flags) => {
    const { search } = this.state;

    if (!search) {
      return flags;
    }

    const searchFlags = flags.data.filter(createFilter(this.state.search, KEYS_TO_FILTERS))

    return {
      ...flags,
      data: searchFlags,
    }
  }

  viewFlagDetails = (flagId) => {
    this.props.history.push(`/flags/${flagId}`);
  }

  handleOpenModal = (flag) => {
    this.setState({ showModal: true, flagDetailsModal: flag });
  }

  handleCloseModal = () => {
    this.setState({ showModal: false });
  }

  updateInput = (e) => {
    this.setState({ [e.target.name] : e.target.value });
  }

  componentDidMount() {
    const token = this.props.login.x_access_token;
    this.props.getFlagsList(token);
    this.props.getSentFlags(token);
    this.props.getPublicFlags(token);
  }

  render() {
    const { showPending, pendingBtnLabel, activeTab, showModal, flagDetailsModal, search } = this.state;
    const { flagsList, sentFlags, publicFlags } = this.props;
    const pendingFlags = showPending ? <PendingFlags flags={sentFlags.data} /> : null;
    const searchAndAdd = activeTab === 0 ? <FlagsListSearchAndAdd updateInput={this.updateInput} searchValue={search} /> : null;
    const headerLabels = this.getHeaderLabelsByActiveTab();
    const flags = this.getFlagsByActiveTab();

    if (flagsList.loading || sentFlags.loading || publicFlags.loading) { return null }

    return (
      <section className={sharedStyles["content-container"]}>
        <HeaderComponent labels={['Flag Manager']}>
          <span className={styles['btn-outline']} onClick={this.togglePendingVisibility}>
            {pendingBtnLabel}
          </span>
        </HeaderComponent>
        {pendingFlags}
        <TabsComponent activeTab={activeTab} updateActiveTab={this.updateActiveTab} tabNames={['Flags', 'Sent', 'Public Flag']}>
          <section>
            {searchAndAdd}
            <FlagsTable
              headerLabels={headerLabels}
              flags={flags.data}
              handleClick={this.viewFlagDetails}
              activeTab={activeTab}
              handleOpenModal={this.handleOpenModal}
              handleCloseModal={this.handleCloseModal}
              showModal={showModal}
              flagDetailsModal={flagDetailsModal}
            />
          </section>
        </TabsComponent>
      </section>
    )
  }
}

function mapStateToProps(state) {
  return {
    login: state.login.loginInformation,
    flagsList: state.flagsList.flagsList,
    sentFlags: state.flagsList.sentFlags,
    publicFlags: state.flagsList.publicFlags,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getFlagsList: (x_access_token) => dispatch(actions.getFlagsList(x_access_token)),
    getSentFlags: (x_access_token) => dispatch(actions.getSentFlags(x_access_token)),
    getPublicFlags: (x_access_token) => dispatch(actions.getPublicFlags(x_access_token)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FlagsListContainer);
