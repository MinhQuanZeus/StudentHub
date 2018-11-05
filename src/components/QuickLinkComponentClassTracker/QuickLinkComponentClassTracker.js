import React from 'react';
import styles from './QuickLinkComponentClassTracker.css';
import Link from "react-router-dom/es/Link";

export const QuickLinkComponentClassTracker = (props) => {

    return (
        <div className={styles["Quick-Link-Container"]}>
        <ul className={styles["Quick-Link-List"]}>
            <li><Link to="/milestone">MHCI</Link></li>
            <li><Link to="/class-tracker">Class Tracker</Link></li>
        </ul>
        </div>
    )
};