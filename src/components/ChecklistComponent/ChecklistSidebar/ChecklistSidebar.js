import React from 'react';
import SidebarHeader from '../SidebarHeader';
import ContactInfo from '../ContactInfo';

import styles from './ChecklistSidebar.module.css';


function ChecklistSidebar({ openChecklistDetails }) {
  return (
    <section className={styles['checklist-detail']}>
      <SidebarHeader openChecklistDetails={openChecklistDetails} />
      <div className={styles['detail-container']}>
        <div className={styles['detail-group']}>
          <span className={styles['label']}>Category</span>
          <p className={styles['value']}>{openChecklistDetails.category}</p>
        </div>
        <div className={styles['detail-group']}>
          <span className={styles['label']}>Sub Category</span>
          <p className={styles['value']}>{openChecklistDetails.sub_category_value}</p>
        </div>
        <div className={styles['detail-group-full']}>
          <span className={styles['label']}>Description</span>
          <p className={styles['description-value']}>{openChecklistDetails.description}</p>
        </div>
      </div>
      <ContactInfo openChecklistDetails={openChecklistDetails} />
    </section>
  )
}

export default ChecklistSidebar;
