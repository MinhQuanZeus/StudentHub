import React from 'react';
import PendingFlag from '../PendingFlag';

import styles from './PendingFlags.css';

function PendingFlags({ flags }) {
  let pendingsList = flags.filter((flag) => flag.status.toLowerCase() === 'pending');
  if (pendingsList.length > 3) {
    pendingsList = pendingsList.slice(0, 3);
  }

  return (
    <section className={styles['pending-flags-container']}>
      <h3>Pending</h3>
      <section className={styles['pending-flags']}>
        {pendingsList.map((pending, idx) => <PendingFlag key={idx} pending={pending} />)}
      </section>
    </section>
  )
}

export default PendingFlags;
