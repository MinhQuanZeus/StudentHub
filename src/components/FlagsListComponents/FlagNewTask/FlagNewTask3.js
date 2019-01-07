import React from 'react';

import styles from './FlagNewTask3.css';

export const FlagNewTask3 = (props) => {
  return (
    <div className={styles['grey-background']}>
      <div className={styles['container']}>
        <div className={styles['header']}>
            <p className={styles['heading']}>Create New Flag</p>
            <p className={styles['close-btn']}>&times;</p>
        </div>
        <div className={styles['step-timeline']}>
            <div>
                <p className={styles['step-label-info']}>Info</p>
                <p className={styles['step-activated']}>1</p>
            </div>
            <div className={styles['line']}></div>
            <div>
                <p className={styles['step-label-details']}>Details</p>
                <p className={styles['step-activated']}>2</p>
            </div>
            <div className={styles['line']}></div>
            <div>
                <p className={styles['step-label-admin']}>Admin</p>
                <p className={styles['step-activated']}>3</p>
            </div>
            <div className={styles['line']}></div>
            <div>
                <p className={styles['step-label-receiver']}>Receiver</p>
                <p className={styles['step-unactivated']}>4</p>
            </div>
        </div>
        <form className={styles['form']}>
        <div className={styles['col-span']}>
        <p className={styles['form-label-large']}>Admin Details</p>
                <input className={styles['input-radio']} type='radio'></input><p className={styles["radio-label"]}>Self Assign</p>
                <input className={styles['input-radio']} type='radio'></input><p className={styles["radio-label"]}>Assigned by Others</p>
            </div>
            <div>
                <p className={styles['form-label']}>Flag Owner</p>
                <input type='text' className={styles['form-text-input']}></input>
            </div>
            <div className={styles['float-right']}>
                <p className={styles['form-label']}>Assigned To</p>
                <input type='text' className={styles['form-text-input']}></input>
            </div>
            <div>
                <p className={styles['form-label']}>Created By</p>
                <input type='text' className={styles['form-text-input']}></input>
            </div>
            <div className={styles['float-right']}>
                <p className={styles['form-label']}>Date Assigned</p>
                <input type='text' className={styles['form-text-input']}></input>
            </div>
            <div className={styles['col-span']}>
                <input type='checkbox' className={styles['checkbox']}></input>
                <p className={styles['checkbox-label']}>Make this flag into a Notification as well</p>
            </div>
        </form>
        <div className={styles['footer']}>
            <button className={styles['next-btn']}>Next</button>
            <button className={styles['previous-btn']}>Previous</button>
        </div>
      </div>
    </div>
  )
}

export default FlagNewTask3;
