import React from 'react';

import styles from './FlagDetailsPopUp.css'

function FlagDetailsPopUp() {
  return (
    <section className={styles['flag-details-container']}>
      <div className={styles['flag-details-info']}>
        <div className={styles['info-group']}>
          <span className={styles['info-label']}>Title</span>
          <p className={styles['info-detail']}>Get Some Job</p>
        </div>
        <div className={styles['info-group']}>
          <span className={styles['info-label']}>Status</span>
          <p className={styles['info-detail']}>Get Some Job</p>
        </div>
        <div className={styles['info-group']}>
          <span className={styles['info-label']}>Flag Category</span>
          <p className={styles['info-detail']}>Get Some Job</p>
        </div>
        <div className={styles['info-group']}>
          <span className={styles['info-label']}>Flag Sub Category</span>
          <p className={styles['info-detail']}>Get Some Job</p>
        </div>
        <div className={styles['info-group']}>
          <span className={styles['info-label']}>Priority</span>
          <p className={styles['info-detail']}>Get Some Job</p>
        </div>
        <div className={styles['info-group']}>
          <span className={styles['info-label']}>Severity</span>
          <p className={styles['info-detail']}>Get Some Job</p>
        </div>
        <div className={styles['info-group']}>
          <span className={styles['info-label']}>Dispatch Type</span>
          <p className={styles['info-detail']}>Get Some Job</p>
        </div>
        <div className={styles['info-group']}>
          <span className={styles['info-label']}>Date Created</span>
          <p className={styles['info-detail']}>Get Some Job</p>
        </div>
        <div className={styles['info-group-full']}>
          <span className={styles['info-label']}>Description</span>
          <p className={styles['info-detail']}>Fusce vehicula dolor arcu, sit amet blandit dolor mollis nec. Donec viverra eleifend lacus, vitae ullamcorper metus. Sed sollicitudin ipsum quis nunc sollicitudin ultrices. Donec euismod scelerisque ligula. Maecenas eu varius risus, eu aliquet arcu.</p>
        </div>
      </div>
    </section>
  )
}

export default FlagDetailsPopUp;
