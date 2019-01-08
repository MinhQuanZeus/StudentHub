import React from 'react';
import SidebarHeader from '../SidebarHeader';
import ContactInfo from '../ContactInfo';
import { getDayMonthYearFormat } from '../../../helpers/Utils';

import styles from './SubChecklistSidebar.module.css';


function SubChecklistSidebar({ openChecklistDetails, openSubChecklistDetails, goBackToChecklist }) {
  return (
    <section className={styles['checklist-detail']}>
      <SidebarHeader openChecklistDetails={openChecklistDetails} openSubChecklistDetails={openSubChecklistDetails} goBackToChecklist={goBackToChecklist} />
      <div className={styles['detail-container']}>
        <div className={styles['detail-group']}>
          <span className={styles['label']}>Status</span>
          <p className={styles['value']}>{openSubChecklistDetails.status}</p>
        </div>
        <div className={styles['detail-group']}>
          <span className={styles['label']}>Due Date</span>
          <p className={styles['value']}>{getDayMonthYearFormat(openSubChecklistDetails.due_date)}</p>
        </div>
        <div className={styles['detail-group']}>
          <span className={styles['label']}>Completion Date</span>
          <p className={styles['value']}>{getDayMonthYearFormat(openSubChecklistDetails.completion_date)}</p>
        </div>
        <div className={styles['detail-group']}>
          <span className={styles['label']}>Created Date</span>
          <p className={styles['value']}>{getDayMonthYearFormat(openSubChecklistDetails.created_at)}</p>
        </div>
        <div className={styles['detail-group']}>
          <span className={styles['label']}>Created By</span>
          <p className={styles['value']}>{openSubChecklistDetails.created_by}</p>
        </div>
        <div className={styles['detail-group-full']}>
          <span className={styles['label']}>Description</span>
          <p className={styles['description-value']}>{openSubChecklistDetails.description}</p>
        </div>
      </div>
      <ContactInfo openChecklistDetails={openChecklistDetails} />
    </section>
  )
}

export default SubChecklistSidebar;
