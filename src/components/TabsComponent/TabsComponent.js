import React from 'react';
import styles from './TabsComponent.css';

export const TabsComponent = (props) => {

    return (
        <div className={styles["Tabs"]}>
            <ul className={styles["semester"]}>
                <li className={styles["selected-tab"]}>Spring</li>
                <li>Summer</li>
                <li>Fall</li>
            </ul>
            <div className={styles["year-container"]}>
                <p className={styles["year"]}>Year:</p>
                <select className={styles["year-selector"]}>
                    <option>2017</option>
                    <option>2018</option>
                    <option>2019</option>
                    <option>2020</option>
                </select>

            </div>
        </div>







    )
};