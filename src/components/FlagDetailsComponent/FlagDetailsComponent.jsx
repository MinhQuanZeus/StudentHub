/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import Status from '../../components/Status';
import Priority from '../../components/Priority';
import styles from './FlagDetailsComponent.m.scss';

function BasicInfo({ subject, status, priority, category_name, sub_category_name, description, created_at }) {
  return (
    <div className={styles['section-container']}>
      <div className={styles['column-left']}>
        <div className={styles['details-container']}>
          <div className={styles['title-section']}>
            <p className={styles['title']}>Title</p>
            <p className={styles['value']}>{subject}</p>
          </div>
          <div className={styles['status-section']}>
            <p className={styles['title']}>Status</p>
            <Status type={status} />
          </div>
          <div className={styles['flag-category-section']}>
            <p className={styles['title']}>Category</p>
            <p className={styles['value']}>{category_name}</p>
          </div>
          <div className={styles['flag-sub-category-section']}>
            <p className={styles['title']}>Sub Category</p>
            <p className={styles['value']}>{sub_category_name}</p>
          </div>
          <div className={styles['priority-section']}>
            <p className={styles['title']}>Priority</p>
            <Priority name={priority} />
          </div>
          <div className={styles['dispatch-type-section']}>
            <p className={styles['title']}>Dispatch Type</p>
            <p className={styles['value']}>Public</p>
          </div>
          <div className={styles['date-created-section']}>
            <p className={styles['title']}>Date Created</p>
            <p className={styles['value']}>{format(created_at, 'DD MMM YYYY')}</p>
          </div>
          <div className={styles['description-section']}>
            <p className={styles['title']}>Description</p>
            <p className={styles['value']}>{description}</p>
          </div>
        </div>
      </div>
      {/* <div className={styles['assign-to-container']}>
        <p className={styles['sub-heading']}>Assign To</p>
        <img alt="user-avatar" className={styles['user-img50']}></img> <p className={styles['user-name-18']}>Arina Belomestnykh</p>
      </div>
      <div className={styles['tag-container']}>
        <p className={styles['sub-heading']}>Tag</p>
        <img alt="user-avatar" className={styles['user-img-50']}></img> <p className={styles['user-name-12']}>Michael</p>
        <img alt="user-avatar" className={styles['user-img50']}></img> <p className={styles['user-name-12']}>Evi</p>
        <img alt="user-avatar" className={styles['user-img-50']}></img> <p className={styles['user-name-12']}>Justin</p>
        <img alt="user-avatar" className={styles['user-img-50']}></img> <p className={styles['user-name-12']}>Kery</p>
      </div>
      <div className={styles['column-right']}>
        <div className={styles['assign-to-container']}>
          <p className={styles['sub-heading']}>Assign To</p>
          <img alt="user-avatar" className={styles['assign-user-img']}></img> <p className={styles['user-name-18']}>Arina Belomestnykh</p>
        </div>
        <div className={styles['tag-container']}>
          <p className={styles['sub-heading']}>Tag</p>
          <img alt="user-avatar" className={styles['user-img-50']}></img> <p className={styles['user-name-12']}>Michael</p>
          <img alt="user-avatar" className={styles['user-img-50']}></img> <p className={styles['user-name-12']}>Evi</p>
          <img alt="user-avatar" className={styles['user-img-50']}></img> <p className={styles['user-name-12']}>Justin</p>
          <img alt="user-avatar" className={styles['user-img-50']}></img> <p className={styles['user-name-12']}>Kery</p>
        </div>
        <div className={styles['attachment-container']}>
          <p className={styles['sub-heading']}>Attachment</p>
          <img alt="attachment" className={styles['attachment-img']}></img>
          <img alt="attachment" className={styles['attachment-img']}></img>
        </div>
        <div className={styles['modify-history-container']}>
          <p className={styles['sub-heading']}>Modify History</p>
          <div className={styles['history-item']}>
            <img alt="user-avatar" className={styles['user-img-40']}></img>
            <p className={styles['history-text']}>Hu Hyon-Suk Reassigned this flag to “Michael Rafael”</p>
            <p className={styles['history-time']}>12:23 AM</p>
          </div>
          <div className={styles['history-item']}>
            <img alt="user-avatar" className={styles['user-img-40']}></img>
            <p className={styles['history-text']}>Jonathan Doe Changed Status to “Pending”</p>
            <p className={styles['history-time']}>16:23 AM</p>
          </div>
        </div>
      </div> */}
    </div>
  );
}
BasicInfo.propTypes = {
  subject: PropTypes.string,
  status: PropTypes.string,
  priority: PropTypes.string,
  category_name: PropTypes.string,
  sub_category_name: PropTypes.string,
  description: PropTypes.string,
  created_at: PropTypes.any,
};
export default BasicInfo;
