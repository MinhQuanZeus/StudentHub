import React from 'react';

import styles from './FlagNewTask4.css';
import { apiConstants } from '../../../constants/applicationConstants';

export const FlagNewTask4 = (props) => {
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
                <p className={styles['step-activated']}>4</p>
            </div>
        </div>
        <div className={styles['selected-tags']}>
            <p className={styles['selected-text']}>4 Selected</p>
            <div className={styles['tag']}>
                <img className={styles['selected']}></img>
                <p className={styles['name']}>Michael</p>
            </div>
            <div className={styles['tag']}>
                <img className={styles['selected']}></img>
                <p className={styles['name']}>Michael</p>
            </div>
        </div>
        <div className={styles['search-area']}>
            <p className={styles['form-label']}>Other people you would like to tag to this flag:</p>
            <input className={styles['search-person-box']}></input>
        </div>
        <div className={styles['spacer']}></div>
        <div className={styles['footer']}>
            <button className={styles['next-btn']}>Next</button>
            <button className={styles['previous-btn']}>Previous</button>
        </div>
      </div>
    </div>
  )
}

export default FlagNewTask4;
