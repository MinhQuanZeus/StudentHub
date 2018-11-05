import React from 'react';
import styles from './MilestoneTabsComponent.css';
import Link from "react-router-dom/es/Link";

export const MilestoneTabsComponent = (props) => {

    return (
        <div className={styles["tab-container"]}>
            <div className={styles["milestone-tab"]}><p><Link to="/milestone">Milestone</Link></p></div>
            <div className={styles["degreeAudit-tab"]}><p><Link to="/degree-audit">Degree Audit</Link></p></div>
            <div className={styles["spacer"]}></div>
        </div>
    )
}