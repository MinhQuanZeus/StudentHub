import React from 'react';

import styles from './FlagsListSearchAndAdd.css';

function FlagsListSearchAndAdd(props) {
  return (
    <div className={styles['flags-list-actions']}>
      <input type='text' placeholder='Search' />
      <span className={styles['add-flag-btn']}>Create New Flag</span>
    </div>
  )
}

export default FlagsListSearchAndAdd;
