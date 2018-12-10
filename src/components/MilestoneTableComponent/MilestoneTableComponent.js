import React from 'react';
import styles from './MilestoneTableComponent.css';
import classnames from 'classnames';

export const MilestoneTableComponent = (props) => {

    console.log(JSON.stringify(props, null, 4));

    const {commonInfoVisibility} = props;

    if (props.milestone !== undefined && props.milestone !== null) {

        const getStatusStyles = (status) => {
            if (status.toUpperCase() === 'not started'.toUpperCase() || status.toUpperCase() === 'to do'.toUpperCase()) return styles["not_started"];
            else if (status.toUpperCase() === 'in progress'.toUpperCase()) return styles["in_progress"];
            else if (status.toUpperCase() === 'completed'.toUpperCase()) return styles["completed"];
            else if (status.toUpperCase() === 'delayed'.toUpperCase()) return styles["delay"];
            else return styles[status];
        }

        const getMilestones = () => {
            return props.milestone.map((element, key) => {
                let status = element.status.toLowerCase();
                return (
                    <div key={key} className={styles["table-row"]}>
                        <p className={styles["task"]}>{element.milestone_name}</p>
                        <p className={styles["number"]}>{element.credits}</p>
                        <p className={styles["type"]}>{element.milestone_type}</p>
                        <p className={styles["target-date"]}>{element.target_date}</p>
                        <div className={styles["progress-bar"]}>100%</div>
                        <p className={classnames(getStatusStyles(status))}>{status}</p>
                    </div>
                );
            })
        }

        return (
            <div className={commonInfoVisibility ? styles["table"] : styles["table-no-info"]}>
                <div className={styles["table-header"]}>
                    <p>Task</p>
                    <p>Number</p>
                    <p>Type</p>
                    <p>Target Date</p>
                    <p>Progress</p>
                    <p>Status</p>
                </div>
                {getMilestones()}
            </div>
        )
    } else {
        return (<div></div>)
    }
};
