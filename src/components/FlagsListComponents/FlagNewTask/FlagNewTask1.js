import React, { Fragment } from 'react';

import styles from './FlagNewTask1.module.css';

export const FlagNewTask1 = props => {
  return (
    <Fragment>
      <div className={styles['form']}>
        <div className={styles['col-span']}>
          <p className={styles['form-label']}>Topic</p>
          <input className={styles['input-2col']} type="text" />
        </div>
        <div>
          <p className={styles['form-label']}>Category</p>
          <select className={styles['input-select']} type="text">
            <option value="choose">Choose Category</option>
            <option value="temp1">temp1</option>
            <option value="temp2">temp2</option>
          </select>
        </div>
        <div className={styles['float-right']}>
          <p className={styles['form-label']}>Sub Category</p>
          <select className={styles['input-select']} type="text">
            <option value="choose">Choose Sub-Category</option>
            <option value="temp1">temp1</option>
            <option value="temp2">temp2</option>
          </select>
        </div>
        <div>
          <p className={styles['form-label']}>Priorirty</p>
          <select className={styles['input-select']} type="text">
            <option value="choose">Choose Priority</option>
            <option value="temp1">temp1</option>
            <option value="temp2">temp2</option>
          </select>
        </div>
        <div className={styles['float-right']}>
          <p className={styles['form-label']}>Severity</p>
          <select className={styles['input-select']} type="text">
            <option value="choose">Choose Severity</option>
            <option value="temp1">temp1</option>
            <option value="temp2">temp2</option>
          </select>
        </div>
        <div>
          <p className={styles['form-label']}>Dispatch Type</p>
          <input className={styles['input-radio']} type="radio" />
          <p className={styles['radio-label']}>Public</p>
          <input className={styles['input-radio']} type="radio" />
          <p className={styles['radio-label']}>Private</p>
        </div>
      </div>
      <button className={styles['next-btn']}>Next</button>
    </Fragment>
  );
};

export default FlagNewTask1;
