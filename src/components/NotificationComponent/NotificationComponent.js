import React from 'react';
import styles from './NotificationComponent.m.scss';

export default function NotificationComponent(props) {
  return (
    <div className={styles['right-bar']}>
      <div className={styles['coming-up']}>
        <div className={styles['section-header']}>
          <i className="far fa-circle"></i>
          <p>Coming Up</p>
        </div>
        <div className={styles['checkbox-list']}>
          <label className={styles['customcheck']}>
            <input type="checkbox" />
            &nbsp; Exam Sains Technology A
          </label>
          <label className={styles['customcheck']}>
            <input type="checkbox" />
            &nbsp; Project #2
          </label>
          <label className={styles['customcheck']}>
            <input type="checkbox" />
            &nbsp; Exam Math
          </label>
        </div>
      </div>
      <div className={styles['notifications']}>
        <div className={styles['section-header']}>
          <i className="far fa-circle"></i>
          &nbsp; Notifications
        </div>
        <div className="notification-list">
          <div className={styles['notification-danger']}>
            <h4>Your Math Exam Score 30!</h4>
            Get score to 70 or you are not pass Math
          </div>
          <div className={styles['notification-warning']}>This is alert warning</div>
          <div className={styles['notification-info']}>This is alert info</div>
          <div className={styles['notification-success']}>This is alert success</div>
        </div>
      </div>
      <div className={styles['upcoming']}>
        <div className={styles['section-header']}>
          <i className="far fa-circle"></i> &nbsp; Upcoming Milestone
        </div>
        <div className={styles['upcoming-list']}>
          <div className={styles['barGraph1']}>
            <p className={styles['alignLeft']}>1st Target</p>
            <p className={styles['alignRight']}>2018/8/3</p>
            <div className={styles['bar1Holder']}>
              <div className={styles['bar1']}></div>
            </div>
          </div>

          <div className={styles['barGraph2']}>
            <p className={styles['alignLeft']}>30 days Math</p>
            <p className={styles['alignRight']}>2018/8/13</p>
            <div className={styles['bar2Holder']}>
              <div className={styles['bar2']}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
