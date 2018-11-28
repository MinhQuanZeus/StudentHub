import React from 'react';
import styles from './TabsComponent.css';

export const TabsComponent = (props) => {

    return (
        <div className={styles["Tabs"]}>
            <ul className={styles["semester"]}>
                  <input type="radio" id={styles["spring"]} name="tab-group-1" defaultChecked="true"/>
                  <label htmlFor={styles["spring"]}>Spring</label>
                  <input type="radio" id={styles["summer"]} name="tab-group-1"/>
                  <label htmlFor={styles["summer"]}>Summer</label>
                  <input type="radio" id={styles["fall"]} name="tab-group-1"/>
                  <label htmlFor={styles["fall"]}>Fall</label>
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
