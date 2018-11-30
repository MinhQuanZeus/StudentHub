import React from 'react';
import styles from './TabsComponent.css';

export const TabsComponent = ({ years, selectedYear, updateYear, updateTerm }) => {
    return (
        <div className={styles["Tabs"]}>
            <ul className={styles["semester"]}>
                  <input type="radio" id={styles["spring"]} name="tab-group-1" defaultChecked="true"/>
                  <label htmlFor={styles["spring"]} onClick={() => updateTerm('spring')}>Spring</label>
                  <input type="radio" id={styles["summer"]} name="tab-group-1"/>
                  <label htmlFor={styles["summer"]} onClick={() => updateTerm('summer')}>Summer</label>
                  <input type="radio" id={styles["fall"]} name="tab-group-1"/>
                  <label htmlFor={styles["fall"]} onClick={() => updateTerm('fall')}>Fall</label>
            </ul>
            <div className={styles["year-container"]}>
                <p className={styles["year"]}>Year:</p>
                <select className={styles["year-selector"]} value={selectedYear} onChange={(e) => updateYear(e)}>
                    {years.map((year, idx) => (
                      <option key={idx} value={year}>{year}</option>
                    ))}
                </select>
            </div>
        </div>
    )
};
