import React from 'react';
import styles from './QuickLinkComponent.css';

export const QuickLinkComponent = (props) => {

    return (
        <div className={styles["Quick-Link-Container"]}>
        <ul className={styles["Quick-Link-List"]}>
            <li>MHCI</li>
            <li>MSTI</li>
            <li className={styles["Selected-Quick-Link"]}>Class Tracker</li>
            <li>Degree Plan</li>
            <li>Academic History</li>
        </ul>
        </div>







    )
};