import React from 'react';
import styles from './ChecklistComponent.css';

export const ChecklistComponent = (props) => {

    return (
        <div>
            <div className={styles["Content-Heading"]}>
            <h2>Coming Up - Checklist</h2><input className={styles["Search-Bar"]} type="text" placeholder="Search"></input>
            </div>
            <div className={styles["Checklist-Heading"]}>
                <p></p><p >CHECKLIST</p><p>CATEGORY</p><p>DUE DATE</p><p>PRIORITY</p><p>COMPLETE RATE</p>
            </div>
            <div className={styles["Checklist-Item"]}>
                <input type="checkbox" className={styles["Checklist-Checkbox"]}></input>
                <p className={styles["Item-Title"]}>Make Powerpoint Science</p>
                <p>General</p>
                <p>2018-09-10 <span className={styles["DueDateCountdown"]}>(3d)</span></p>
                <p className={styles["Priority-Low"]}>Low</p>
                <p className={styles["CompleteRate-Due"]}>Due</p>
            </div>
            <div className={styles["Checklist-Item"]}>
            <input type="checkbox" className={styles["Checklist-Checkbox"]}></input>
                <p className={styles["Item-Title"]}>Make Powerpoint Science</p>
                <p>General</p>
                <p>2018-09-10 <span className={styles["DueDateCountdown"]}>(3d)</span></p>
                <p className={styles["Priority-High"]}>High</p>
                <p className={styles["CompleteRate-Done"]}>Done</p>
            </div>
            <div className={styles["Checklist-Item"]}>
            <input type="checkbox" className={styles["Checklist-Checkbox"]}></input>
                <p className={styles["Item-Title"]}>Make Powerpoint Science</p>
                <p>General</p>
                <p>2018-09-10 <span className={styles["DueDateCountdown"]}>(3d)</span></p>
                <p className={styles["Priority-Medium"]}>Medium</p>
                <p className={styles["CompleteRate-Number"]}>50%</p>
            </div>
        </div>
    )
};