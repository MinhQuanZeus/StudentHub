import React from 'react';

import styles from './FlagNewTask1.css';

export const FlagNewTask1 = (props) => {
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
                <p className={styles['step-unactivated']}>2</p>
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
        <div className={styles['form']}>
            <div className={styles['col-span']}>
                <p className={styles['form-label']}>Topic</p>
                <input className={styles['input-2col']} type='text'></input>
            </div>
            <div>
                <p className={styles['form-label']}>Category</p>
                <select className={styles['input-select']} type='text'>
                    <option value="choose">Choose Category</option>
                    <option value="temp1">temp1</option>
                    <option value="temp2">temp2</option>
                </select>
            </div>
            <div className={styles['float-right']}>
                <p className={styles['form-label']}>Sub Category</p>
                <select className={styles['input-select']} type='text'>
                    <option value="choose">Choose Sub-Category</option>
                    <option value="temp1">temp1</option>
                    <option value="temp2">temp2</option>
                </select>
            </div>
            <div>
                <p className={styles['form-label']}>Priorirty</p>
                <select className={styles['input-select']} type='text'>
                    <option value="choose">Choose Priority</option>
                    <option value="temp1">temp1</option>
                    <option value="temp2">temp2</option>
                </select>
            </div>
            <div className={styles['float-right']}>
                <p className={styles['form-label']}>Severity</p>
                <select className={styles['input-select']} type='text'>
                    <option value="choose">Choose Severity</option>
                    <option value="temp1">temp1</option>
                    <option value="temp2">temp2</option>
                </select>
            </div>
            <div>
                <p className={styles['form-label']}>Dispatch Type</p>
                <input className={styles['input-radio']} type='radio'></input><p className={styles["radio-label"]}>Public</p>
                <input className={styles['input-radio']} type='radio'></input><p className={styles["radio-label"]}>Private</p>
            </div>
        </div>
        <button className={styles['next-btn']}>Next</button>
      </div>
    </div>
  )
}

export default FlagNewTask1;
