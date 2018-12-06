import React from 'react';
import PendingFlag from '../PendingFlag';

import styles from './PendingFlags.css';

function PendingFlags({ flags }) {
  let pendingsList = flags.filter((flag) => {
    const status = flag.status.toLowerCase();
    return status === 'pending' && flag.is_public;
  });
  if (pendingsList.length > 3) {
    pendingsList = pendingsList.slice(0, 3);
  }

  return (
    <section className={styles['pending-flags-container']}>
      <h3>Pending</h3>
      <section className={styles['pending-flags']}>
        {pendingsList.length
          ? pendingsList.map((pending, idx) => <PendingFlag key={idx} pending={pending} />)
          : <p>No pending flags</p>
        }
      </section>
    </section>
  )
}

export default PendingFlags;
