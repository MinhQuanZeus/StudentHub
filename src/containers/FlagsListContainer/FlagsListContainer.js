/* eslint-disable camelcase */
import React, { Component } from 'react';
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
import PendingFlags from '../../components/FlagsListComponents/PendingFlags';
import TabsComponent from '../../components/FlagsListComponents/TabsComponent';
import { PrimaryButton, ProgressIndicator } from 'office-ui-fabric-react';
import FlagCreator from '../../components/FlagsListComponents/FlagCreator';
import sharedStyles from '../../styles/styles.module.css';
import css from './FlagsListContainer.m.scss';
import { AppContext } from '../AppContext';
import DataList from '../../components/FlagsListComponents/DataList';
import { API_END_POINT } from '../../constants/ApiUrl';
import { format } from 'date-fns';
import cns from 'classnames';
import orderBy from 'lodash.orderby';
import Details from '../../components/FlagsListComponents/Details';
import Status from '../../components/Status';
import Priority from '../../components/Priority';

class FlagsListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      items: [[], [], [], [], []],
      sort: -1,
      showPending: true,
      pendingBtnLabel: 'Hide Pending',
      activeTab: 0,
      isOpen: false,
      details: {},
      search: '',
      creator: {
        isOpen: false,
      },
    };
    this.openCreator = this.openCreator.bind(this);
    this.closeCreator = this.closeCreator.bind(this);
    this.intialize = this.intialize.bind(this);
    this.orderBy = this.orderBy.bind(this);
    this.onGetDetails = this.onGetDetails.bind(this);
    this.onSuccessCreator = this.onSuccessCreator.bind(this);
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
    const items = bodies.map((b) => (b.success ? b.data : []));
    items.push(items[3].filter((o) => o.status && o.status.toLowerCase() === 'pending'));
    this.setState(() => ({
      isLoading: false,
      items: items,
    }));
  }

  updateActiveTab = (idx) => {
    this.setState((prevState) => {
      if (prevState.activeTab !== idx) {
        return { activeTab: idx, search: '' };
      }
    });
  };

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

  onSuccessCreator($event) {
    this.setState((state) => ({
      creator: {
        isOpen: false,
      },
    }));
    this.intialize();
  }

  orderBy(idx) {
    const { activeTab } = this.state;
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

    this.setState((state) => ({
      sort: idx,
      items: (state.items[activeTab] = items) && state.items,
    }));
  }

  async onGetDetails(details) {
    this.setState(() => ({ isOpen: true, details: details }));
    const { x_access_token } = this.context.user;
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': x_access_token,
      },
    };
    const response = await fetch(`${API_END_POINT}student/flag/detail/${details.id}`, options);
    const body = await response.json();
    if (body.success) {
      this.setState(() => ({ details: body.data }));
    }
  }

  render() {
    const { isLoading, items, activeTab, sort, isOpen, details } = this.state;

    const headers = ['Flag', activeTab === 3 ? 'To' : 'From', 'Title', 'Category', 'Sub Cat', 'Date Created', 'Status', 'Priority'];

    return (
      <section className={cns(sharedStyles['content-container'], css['content-container'])}>
        <FlagCreator
          isOpen={this.state.creator.isOpen}
          onDismiss={this.closeCreator}
          onSuccessCreator={this.onSuccessCreator}
          context={this.context}
        />
        <HeaderComponent labels={['Flag Manager']}>
          <PrimaryButton text="Create New Flag" onClick={this.openCreator} />
        </HeaderComponent>
        <PendingFlags items={items[4]} />
        <TabsComponent activeTab={activeTab} updateActiveTab={this.updateActiveTab} tabNames={['Assigned', 'Tagged', 'Public', 'Sent']}>
          {isLoading ? (
            <ProgressIndicator />
          ) : (
            <DataList
              className={css.FlagList}
              items={items[activeTab]}
              headers={headers}
              onRenderItem={(o) => (
                <tr key={o.id} onClick={() => this.onGetDetails(o)}>
                  <td>{o.id}</td>
                  <td>{activeTab !== 3 ? o.creator : o.to}</td>
                  <td>{o.subject}</td>
                  <td>{o.category_name}</td>
                  <td>{o.sub_category_name}</td>
                  <td>{format(o.created_at, 'DD MMM YYYY')}</td>
                  <td>
                    <Status type={o.status} />
                  </td>
                  <td>
                    <Priority className={css.Priority} name={o.priority} />
                  </td>
                </tr>
              )}
              sort={sort}
              orderBy={this.orderBy}
            />
          )}
        </TabsComponent>
        <Details isOpen={isOpen} {...details} onDismiss={() => this.setState(() => ({ isOpen: false }))} />
      </section>
    );
  }
}
FlagsListContainer.contextType = AppContext;

export default FlagsListContainer;
