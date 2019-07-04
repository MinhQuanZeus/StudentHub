import React from 'react';
import SidebarHeader from '../SidebarHeader';
import ContactInfo from '../ContactInfo';
import { format, distanceInWordsToNow } from 'date-fns';
import styles from './SubChecklistSidebar.module.css';

function SubChecklistSidebar({ openChecklistDetails, openSubChecklistDetails, goBackToChecklist }) {
  return (
    <section className={styles['checklist-detail']}>
      <SidebarHeader
        openChecklistDetails={openChecklistDetails}
        openSubChecklistDetails={openSubChecklistDetails}
        goBackToChecklist={goBackToChecklist}
      />
      <div className={styles['detail-container']}>
        <div className={styles['detail-group']}>
          <span className={styles['label']}>Status</span>
          <p className={styles['value']}>{openSubChecklistDetails.status}</p>
        </div>
        <div className={styles['detail-group']}>
          <span className={styles['label']}>Due Date</span>
          <p className={styles['value']}>
            <span>{format(openSubChecklistDetails.due_date, 'YYYY-MM-DD')}</span>
            <span>({distanceInWordsToNow(openSubChecklistDetails.due_date)})</span>
          </p>
        </div>
        <div className={styles['detail-group']}>
          <span className={styles['label']}>Completion Date</span>
          <p className={styles['value']}>
            {openSubChecklistDetails.completion_date ? format(openSubChecklistDetails.completion_date, 'YYYY-MM-DD') : '-'}
          </p>
        </div>
        <div className={styles['detail-group']}>
          <span className={styles['label']}>Created Date</span>
          <p className={styles['value']}>
            {openSubChecklistDetails.created_at ? format(openSubChecklistDetails.created_at, 'YYYY-MM-DD') : '-'}
          </p>
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
  );
}

export default SubChecklistSidebar;
