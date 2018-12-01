import React from 'react';
import styles from './MilestoneTableComponent.css';
import classnames from 'classnames';

export const MilestoneTableComponent = (props) => {

    if (props.milestone !== undefined && props.milestone !== null) {
        console.log(JSON.stringify(props.milestone, null, 4));

        const getStatusStyles = (status) => {
          if (status === 'not started') return styles["not_started"];
          else if (status === 'in progress') return styles["in_progress"];
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
            <div className={styles["table"]}>
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
