import React from 'react';

import styles from './TabsComponent.module.css';

function TabsComponent({ activeTab, updateActiveTab, tabNames, children }) {
  return (
    <section className={styles['tabs-container']}>
      <div className={styles['tabs-header']}>
        <ul className={styles['tabs-list']}>
          {tabNames.map((name, idx) => (
            <span key={idx} className={activeTab === idx ? styles['active-tab'] : ''}>
              <li onClick={() => updateActiveTab(idx)}>
                {name}
              </li>
            </span>
          ))}
        </ul>
        <div className={styles['border-line']}></div>
      </div>
      {children}
    </section>
  )
}

export default TabsComponent;
