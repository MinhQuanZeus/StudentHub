import React from 'react';

import styles from './SidebarHeader.module.css';


function SidebarHeader({ openChecklistDetails, openSubChecklistDetails, goBackToChecklist }) {
  let header;

  if (openChecklistDetails !== undefined && openSubChecklistDetails === undefined) {
    header = (
      <div className={styles['detail-container']}>
        <h3>{openChecklistDetails.check_list_name}</h3>
        <div className={`${styles['sub-checklist-count']} ${styles['align-right']}`}><span>{openChecklistDetails.sub_checklist_length}</span></div>
      </div>
    )
  } else if (openSubChecklistDetails !== undefined) {
    const priorityStatus = `priority-${openSubChecklistDetails.priority.toLowerCase()}`;

    header = (
      <div className={styles['detail-container']}>
        <h4 onClick={goBackToChecklist}><i className='fa fa-arrow-left'></i>{openChecklistDetails.check_list_name.toUpperCase()}</h4>
        <h3>{openSubChecklistDetails.sub_check_list_name}</h3>
        <span className={`${styles['priority']} ${styles[priorityStatus]} ${styles['align-right']}`}>{openSubChecklistDetails.priority}</span>
      </div>
    )
  }

  return header;
}

export default SidebarHeader;
