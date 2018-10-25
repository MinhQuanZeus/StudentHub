import React from 'react';
import styles from './MilestoneTableComponent.css';





export const MilestoneTableComponent = (props) => {

    return (
        <div className={styles["table"]}>
            <div className={styles["table-header"]}>
                <p>Task</p> <p className={styles["center-align"]}>Number</p> <p>Type</p> <p className={styles["center-align"]}>Target Date</p> <p className={styles["center-align"]}>Progress</p> <p className={styles["center-align"]}>Status</p>
            </div>
            
            <div className={styles["table-row"]}>
                <p className={styles["task"]}>Task #1</p>
                <p className={styles["number"]}>2</p>
                <p className={styles["type"]}>Academic</p>
                <p className={styles["target-date"]}>2018-08-10</p>
                <div className={styles["progress-bar"]}>100%</div>
                <p className={styles["status-completed"]}>Completed</p>
                </div>
                
        </div>
        
    )
};