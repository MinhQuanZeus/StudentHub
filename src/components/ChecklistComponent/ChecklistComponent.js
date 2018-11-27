import React from 'react';
import styles from './ChecklistComponent.css';

export const ChecklistComponent = (props) => {
    const checkList = props.data.checkList;
    return (
        <div>
            <div className={styles["Content-Heading"]}>
                <h2>Coming Up - Checklist</h2><input className={styles["Search-Bar"]} type="text"
                                                     placeholder="Search"/>
            </div>
            <div className={styles["Checklist-Heading"]}>
                <p></p><p>CHECKLIST</p><p>CATEGORY</p><p>DUE DATE</p><p>PRIORITY</p><p>COMPLETE RATE</p>
            </div>
            {checkList.map((rowData, index) => {
                return <div className={styles["Checklist-Item"]} key={index}>
                    <input type="checkbox" className={styles["Checklist-Checkbox"]}/>
                    <p className={styles["Item-Title"]}>{rowData.check_list_name}</p>
                    <p>{rowData.category}</p>
                    <p>{rowData.due_date} <span className={styles["DueDateCountdown"]}>(3d)</span></p>
                    <p className={styles["Priority-Low"]}>Low</p>
                    <p className={styles["CompleteRate-Due"]}>Due</p>
                </div>
            })}
        </div>
    )

};