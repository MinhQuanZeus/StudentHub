import React from 'react';
import { Link } from '@reach/router';
import ReactModal from 'react-modal';
import { getDayMonthYearFormat } from '../../../helpers/Utils';

import styles from './FlagDetailsModal.module.css';

ReactModal.setAppElement('#root');

function FlagDetailsModal({ handleCloseModal, showModal, flag }) {
  const statusStyle = flag.status.toLowerCase();
  const dispatchType = flag.is_public ? 'Public' : 'Private';

  return (
    <ReactModal
      isOpen={showModal}
      contentLabel="Flag Detail Popup"
      className={styles['modal']}
      overlayClassName={styles['overlay']}
    >
      <section className={styles['flag-details-container']}>
        <header>
          <span>Details</span>
          <div className={styles['modal-close-btn']} onClick={handleCloseModal}>
            <i className="fa fa-times" />
          </div>
        </header>
        <section className={styles['modal-body-container']}>
          <section className={styles['flag-details-info']}>
            <div className={styles['info-group']}>
              <span className={styles['info-label']}>Title</span>
              <p className={styles['info-detail']}>{flag.subject}</p>
            </div>
            <div className={styles['info-group']}>
              <span className={styles['info-label']}>Status</span>
              <p className={`${styles['info-detail']} ${styles[statusStyle]}`}>
                {flag.status}
              </p>
            </div>
            <div className={styles['info-group']}>
              <span className={styles['info-label']}>Flag Category</span>
              <p className={styles['info-detail']}>{flag.category}</p>
            </div>
            <div className={styles['info-group']}>
              <span className={styles['info-label']}>Flag Sub Category</span>
              <p className={styles['info-detail']}>{flag.sub_category}</p>
            </div>
            <div className={styles['info-group']}>
              <span className={styles['info-label']}>Priority</span>
              <p className={styles['info-detail']}>{flag.priority}</p>
            </div>
            <div className={styles['info-group']}>
              <span className={styles['info-label']}>Severity</span>
              <p className={styles['info-detail']}>{flag.severity}</p>
            </div>
            <div className={styles['info-group']}>
              <span className={styles['info-label']}>Dispatch Type</span>
              <p className={styles['info-detail']}>{dispatchType}</p>
            </div>
            <div className={styles['info-group']}>
              <span className={styles['info-label']}>Date Created</span>
              <p className={styles['info-detail']}>
                {getDayMonthYearFormat(flag.created_at)}
              </p>
            </div>
            <div className={styles['info-group-full']}>
              <span className={styles['info-label']}>Description</span>
              <div className={styles['info-detail-textarea']}>
                <p className={styles['info-detail']}>{flag.description}</p>
              </div>
            </div>
          </section>
          <section className={styles['flag-details-right']}>
            <div className={styles['people-section']}>
              <span className={styles['info-label']}>To</span>
            </div>
            <div className={styles['attachments-section']}>
              <span className={styles['info-label']}>Attachments</span>
            </div>
          </section>
        </section>
        <footer>
          <Link to={`/flags/${flag.id}`}>
            <span className={styles['btn-details']}>View More Details</span>
          </Link>
        </footer>
      </section>
    </ReactModal>
  );
}

export default FlagDetailsModal;
