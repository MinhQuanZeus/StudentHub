import React from 'react';
import sharedStyles from '../../styles/styles.css';
import styles from './HeaderComponent.css';

function HeaderComponent({ label, btnLabel, clickFxn }) {
  let btn = null;

  if (btnLabel !== undefined && clickFxn !== undefined) {
    btn = (
      <span className={styles['header-btn']} onClick={clickFxn}>
        {btnLabel}
      </span>
    )
  }

  return (
    <div className={sharedStyles['content-header']}>
      <h3 className={sharedStyles['content-label']}>{label}</h3>
      {btn}
    </div>
  )
}

export default HeaderComponent;
