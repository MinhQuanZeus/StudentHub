/* eslint-disable camelcase */
/* global fetch */
import React, { Component } from 'react';
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
import PendingFlags from '../../components/FlagsListComponents/PendingFlags';
import TabsComponent from '../../components/FlagsListComponents/TabsComponent';
// import FlagsTable from '../../components/FlagsListComponents/FlagsTable';
// import { createFilter } from 'react-search-input';
import { PrimaryButton } from 'office-ui-fabric-react';
import FlagCreator from '../../components/FlagsListComponents/FlagCreator';
// import * as actions from '../../actions/FlagsListActions/FlagsListActions';

import sharedStyles from '../../styles/styles.module.css';
import css from './FlagsListContainer.m.scss';
import { AppContext } from '../AppContext';
import DataList from '../../components/FlagsListComponents/DataList';
import { API_END_POINT } from '../../constants/ApiUrl';
import { format } from 'date-fns';
// const KEYS_TO_FILTERS = ['id', 'created_by', 'subject', 'category', 'sub_category', 'status', 'severity', 'created_at', 'priority'];
import cns from 'classnames';
import orderBy from 'lodash.orderby';

class FlagsListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      items: [[], [], [], []],
      sort: -1,
      showPending: true,
      pendingBtnLabel: 'Hide Pending',
      activeTab: 0,
      showModal: false,
      flagDetailsModal: {},
      search: '',
      creator: {
        isOpen: false,
      },
    };
    this.openCreator = this.openCreator.bind(this);
    this.closeCreator = this.closeCreator.bind(this);
    this.intialize = this.intialize.bind(this);
    this.orderBy = this.orderBy.bind(this);
  }

  async intialize() {
    const { x_access_token } = this.context.user;
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': x_access_token,
      },
    };
    const responses = await Promise.all([
      fetch(`${API_END_POINT}student/flag/assigned`, options),
      fetch(`${API_END_POINT}student/flag/tagged`, options),
      fetch(`${API_END_POINT}student/flag/public`, options),
      fetch(`${API_END_POINT}student/flag/sent`, options),
    ]);
    const bodies = await Promise.all(responses.map((response) => response.json()));
    this.setState(() => ({
      items: bodies.map((b) => (b.success ? b.data : [])),
    }));
  }

  updateActiveTab = (idx) => {
    this.setState((prevState) => {
      if (prevState.activeTab !== idx) {
        return { activeTab: idx, search: '' };
      }
    });
  };

  // viewFlagDetails = (flagId) => {
  //   this.props.navigate(`/flags/${flagId}`);
  // };

  // handleOpenModal = (flag) => {
  //   this.setState({ showModal: true, flagDetailsModal: flag });
  // };

  // handleCloseModal = () => {
  //   this.setState({ showModal: false });
  // };

  // updateInput = (e) => {
  //   this.setState({ [e.target.name]: e.target.value });
  // };

  componentDidMount() {
    this.intialize();
  }

  openCreator($event) {
    this.setState((state) => ({
      creator: {
        isOpen: true,
      },
    }));
  }

  closeCreator($event) {
    this.setState((state) => ({
      creator: {
        isOpen: false,
      },
    }));
  }

  orderBy(idx) {
    const { activeTab } = this.state;
    // console.log(this.state);
    const items = orderBy(
      this.state.items[activeTab],
      (o) => {
        switch (idx) {
        case -1:
        case 1:
          return o.id.padStart(20, '0');
        case -2:
        case 2:
          return this.state.tab === 3 ? o.to : o.creator;
        case -3:
        case 3:
          return o.subject;
        case -4:
        case 4:
          return o.category;
        case -5:
        case 5:
          return o.sub_category;
        case -6:
        case 6:
          return o.created_at;
        case -7:
        case 7:
          return o.status;
        case -8:
        case 8:
          return o.priority;
        default:
          return o.id.padStart(20, '0');
        }
      },
      idx > 0 ? 'asc' : 'desc'
    );

    // console.log(idx, items);

    this.setState((state) => ({
      sort: idx,
      items: (state.items[activeTab] = items) && state.items,
    }));
  }

  render() {
    const { items, activeTab, sort } = this.state;

    const headers = ['Flag', activeTab === 3 ? 'To' : 'From', 'Title', 'Category', 'Sub Cat', 'Date Created', 'Status', 'Priority'];

    return (
      <section className={cns(sharedStyles['content-container'], css['content-container'])}>
        <FlagCreator isOpen={this.state.creator.isOpen} onRequestClose={this.closeCreator} context={this.context} />
        <HeaderComponent labels={['Flag Manager']}>
          <PrimaryButton text="Create New Flag" onClick={this.openCreator} />
        </HeaderComponent>
        <PendingFlags
          items={[
            { id: 'F0023', subject: 'Take some books!', priority: 'high' },
            { id: 'F0024', subject: 'Take some books!', priority: 'medium' },
            { id: 'F0025', subject: 'Take some books!', priority: 'low' },
          ]}
        />
        <TabsComponent activeTab={activeTab} updateActiveTab={this.updateActiveTab} tabNames={['Assigned', 'Tagged', 'Public', 'Sent']}>
          <DataList
            className={css.FlagList}
            items={items[activeTab]}
            headers={headers}
            onRenderItem={(o) => (
              <tr key={o.id}>
                <td>{o.id}</td>
                <td>{o.creator}</td>
                <td>{o.subject}</td>
                <td>{o.category}</td>
                <td>{o.sub_category}</td>
                <td>{format(o.created_at, 'DD MMM YYYY')}</td>
                <td>
                  <div className={cns('Status', o.status && o.status.toLowerCase())}>{o.status}</div>
                </td>
                <td>
                  <div className={cns('Priority', o.priority && o.priority.toLowerCase())}>
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                  </div>
                </td>
              </tr>
            )}
            sort={sort}
            orderBy={this.orderBy}
          />
        </TabsComponent>
      </section>
    );
  }
}
FlagsListContainer.contextType = AppContext;

// function mapStateToProps(state) {
//   return {
//     flagsList: state.flagsList.flagsList,
//     sentFlags: state.flagsList.sentFlags,
//     publicFlags: state.flagsList.publicFlags,
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     getFlagsList: (x_access_token) => dispatch(actions.getFlagsList(x_access_token)),
//     getSentFlags: (x_access_token) => dispatch(actions.getSentFlags(x_access_token)),
//     getPublicFlags: (x_access_token) => dispatch(actions.getPublicFlags(x_access_token)),
//   };
// }

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(FlagsListContainer);

export default FlagsListContainer;
