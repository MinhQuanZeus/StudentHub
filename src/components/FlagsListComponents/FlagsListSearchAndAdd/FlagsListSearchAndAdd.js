import React from 'react';

import styles from './FlagsListSearchAndAdd.css';

function FlagsListSearchAndAdd(props) {
  return (
    <div className={styles['flags-list-actions']}>
      <div className={styles['flags-search-box']}>
        <i className='fa fa-search'></i>
        <input type='text' placeholder='Search' />
      </div>
      <span className={styles['add-flag-btn']}>Create New Flag</span>
    </div>
  )
}

export default FlagsListSearchAndAdd;
