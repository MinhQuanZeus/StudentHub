import React from 'react';

import styles from './FlagsListSearchAndAdd.module.css';

function FlagsListSearchAndAdd({ updateInput, searchValue }) {
  return (
    <div className={styles['flags-list-actions']}>
      <div className={styles['flags-search-box']}>
        <i className="fa fa-search" />
        <input
          type="text"
          placeholder="Search"
          onChange={updateInput}
          value={searchValue}
          name="search"
        />
      </div>
      {/* <span className={styles['add-flag-btn']}>Create New Flag</span> */}
    </div>
  );
}

export default FlagsListSearchAndAdd;
