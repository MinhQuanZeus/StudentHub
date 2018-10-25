import React from 'react';
import styles from './MilestoneTabsComponent.css';

export const MilestoneTabsComponent = (props) => {

    return (
        <div className={styles["tab-container"]}>
            <div className={styles["milestone-tab"]}><p>Milestone</p></div>
            <div className={styles["degreeAudit-tab"]}><p>Degree Audit</p></div>
            <div className={styles["spacer"]}></div>
        </div>
    )
}