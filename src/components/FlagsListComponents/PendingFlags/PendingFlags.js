/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Icon } from 'office-ui-fabric-react';
import cns from 'classnames';
import PendingFlag from '../PendingFlag';

import css from './PendingFlags.m.scss';

class PendingFlags extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: false,
    };
  }

  render() {
    const { items } = this.props;
    const { hidden } = this.state;
    // let pendingsList = items.filter((flag) => {
    //   const status = flag.status.toLowerCase();
    //   return status === 'pending' && flag.is_public;
    // });
    // if (pendingsList.length > 3) {
    //   pendingsList = pendingsList.slice(0, 3);
    // }

    return (
      <section className={css['pending-flags-container']}>
        <div>
          <h3>Pending</h3>
          <span className={css['btn-outline']} onClick={() => this.setState((state) => ({ hidden: !state.hidden }))}>
            {hidden ? `Show Pending (${items.length})` : 'Hide Pending'}
            &nbsp;
            <Icon iconName={hidden ? 'ChevronDown' : 'ChevronUp'} />
          </span>
        </div>

        <section className={cns(css['pending-flags'], hidden && css['hidden'])}>
          {items.length ? items.map((pending) => <PendingFlag key={pending.id} {...pending} />) : <p>No pending flags</p>}
        </section>
      </section>
    );
  }
}

export default PendingFlags;
