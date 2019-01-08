import React from 'react';

import styles from './PendingFlag.module.css';


function PendingFlag({ pending }) {
  return (
    <section className={styles['pending-flag-container']}>
      <div className={styles['pending-flag-top']}>
        <p>{pending.id}</p>
        <span className={styles['pending-flag-status']}>
          priority
        </span>
      </div>
      <div className={styles['pending-flag-bottom']}>
        <p>{pending.subject}</p>
        <span className={styles['pending-flag-level']}>!!</span>
      </div>
    </section>
  )
}

export default PendingFlag;
