import React from 'react';
import styles from './QuickLinkComponent.css';
import Link from "react-router-dom/es/Link";

export const QuickLinkComponent = (props) => {
    return (
        <div className={styles["Quick-Link-Container"]}>
            <ul className={styles["Quick-Link-List"]}>
                <li className={styles["unselected"]}><Link to="/milestone">EE</Link></li>
                <li className={styles["selected"]}><Link to="/class-tracker">Class Tracker</Link></li>
            </ul>
        </div>
    )
};