import React from 'react';

import styles from './ContactInfo.module.css';

function ContactInfo({ openChecklistDetails }) {
  return (
    <div className={`${styles['contact']} ${styles['detail-container']}`}>
      <h4>CONTACT INFO</h4>
      <div className={styles['detail-group']}>
        <span className={styles['label']}>Phone</span>
        <p className={styles['value']}>{openChecklistDetails.phone}</p>
      </div>
      <div className={styles['detail-group']}>
        <span className={styles['label']}>Fax</span>
        <p className={styles['value']}>{openChecklistDetails.fax}</p>
      </div>
      <div className={styles['detail-group']}>
        <span className={styles['label']}>Email</span>
        <p className={styles['value']}>{openChecklistDetails.email}</p>
      </div>
      <div className={styles['detail-group']}>
        <span className={styles['label']}>Website</span>
        <p className={styles['value']}>{openChecklistDetails.website}</p>
      </div>
    </div>
  );
}

export default ContactInfo;
