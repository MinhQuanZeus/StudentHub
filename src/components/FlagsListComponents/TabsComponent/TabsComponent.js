/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { SearchBox } from 'office-ui-fabric-react';

import styles from './TabsComponent.m.scss';

class TabsComponent extends Component {
  render() {
    const { activeTab, updateActiveTab, tabNames, children } = this.props;

    return (
      <section className={styles['tabs-container']}>
        <div className={styles['tabs-header']}>
          <div>
            <ul className={styles['tabs-list']}>
              {tabNames.map((name, idx) => (
                <span key={idx} className={activeTab === idx ? styles['active-tab'] : ''}>
                  <li onClick={() => updateActiveTab(idx)}>{name}</li>
                </span>
              ))}
            </ul>
            <SearchBox placeholder="Search" />
          </div>
          <div className={styles['border-line']} />
        </div>
        {children}
      </section>
    );
  }
}

export default TabsComponent;
