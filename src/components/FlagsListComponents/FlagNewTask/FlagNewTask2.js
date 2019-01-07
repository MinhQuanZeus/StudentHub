import React from 'react';

import styles from './FlagNewTask2.css';

export const FlagNewTask2 = (props) => {
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
                <p className={styles['step-unactivated']}>3</p>
            </div>
            <div className={styles['line']}></div>
            <div>
                <p className={styles['step-label-receiver']}>Receiver</p>
                <p className={styles['step-unactivated']}>4</p>
            </div>
        </div>
        <form>
            <p className={styles['form-label']}>Description</p>
            <input type='text' className={styles['description-textbox']}></input>
            <p className={styles['form-label']}>Attachment</p>
            <div className={styles['drop-zone']}></div>
        </form>
        <div className={styles['attachment-display']}>
        {/*     Attatched files trigger the .attachment-img     Remove divs below if no attachemts      */}
            <div className={styles['attachment-img']}></div>
            <div className={styles['attachment-img']}></div>
            <div className={styles['attachment-img']}></div>
            <div className={styles['attachment-img']}></div>
        </div>
        <div className={styles['footer']}>
            <button className={styles['next-btn']}>Next</button>
            <button className={styles['previous-btn']}>Previous</button>
        </div>
      </div>
    </div>
  )
}

export default FlagNewTask2;
