import React from 'react';
import styles from './MilestoneTableComponent.css';

export const MilestoneTableComponent = (props) => {

    if (props.milestone !== undefined && props.milestone !== null) {
        console.log(JSON.stringify(props.milestone, null, 4));
        let {milestone_name, milestone_type, target_date, credits, status} = props.milestone;
        return (
            <div className={styles["table"]}>
                <div className={styles["table-header"]}>
                    <p>Task</p> <p className={styles["center-align"]}>Number</p> <p>Type</p> <p
                    className={styles["center-align"]}>Target Date</p> <p
                    className={styles["center-align"]}>Progress</p> <p className={styles["center-align"]}>Status</p>
                </div>

                <div className={styles["table-row"]}>
                    <p className={styles["task"]}>{milestone_name}</p>
                    <p className={styles["number"]}>{credits}</p>
                    <p className={styles["type"]}>{milestone_type}</p>
                    <p className={styles["target-date"]}>{target_date}</p>
                    <div className={styles["progress-bar"]}>100%</div>
                    <p className={styles["status-completed"]}>{status}</p>
                </div>

            </div>

        )
    } else {
        return (<div></div>)
    }


};
