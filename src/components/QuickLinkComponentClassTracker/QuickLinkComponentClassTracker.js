import React from 'react';
import styles from './QuickLinkComponentClassTracker.module.css';
import Link from "react-router-dom/es/Link";

export const QuickLinkComponentClassTracker = (props) => {

    return (
        <div className={styles["Quick-Link-Container"]}>
        <ul className={styles["Quick-Link-List"]}>
            <li className={styles["unselected"]}><Link to="/milestone">&nbsp;EE</Link></li>
            <li className={styles["selected"]}><Link to="/class-tracker">&nbsp;Class Tracker</Link></li>
        </ul>
        </div>
    )
};