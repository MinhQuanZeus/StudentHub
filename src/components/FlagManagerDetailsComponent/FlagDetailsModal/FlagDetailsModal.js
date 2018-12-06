import React from 'react';
import ReactModal from 'react-modal';

import styles from './FlagDetailsModal.css';

ReactModal.setAppElement('#root');


function FlagDetailsModal({ handleCloseModal, showModal }) {
  return (
    <ReactModal
       isOpen={showModal}
       contentLabel="Flag Detail Popup"
       className={styles['modal']}
       overlayClassName={styles["overlay"]}
    >
      <section className={styles['flag-details-container']}>
        <header>
          <span>Details</span>
          <div className={styles['modal-close-btn']}><i className='fa fa-times' onClick={handleCloseModal}></i></div>
        </header>
        <section className={styles['modal-body-container']}>
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
          <div className={styles['flag-details-right']}>
            <div className={styles['people-section']}>
              <span className={styles['info-label']}>To</span>
            </div>
            <div className={styles['attachments-section']}>
            <span className={styles['info-label']}>Attachments</span>
            </div>
          </div>
        </section>
        <footer>
          <span className={styles['btn-details']}>View More Details</span>
        </footer>
      </section>
    </ReactModal>
  )
}

export default FlagDetailsModal;
