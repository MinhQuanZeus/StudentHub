import React from 'react';
import styles from './ChecklistComponentSubItems.css';

export const ChecklistComponentSubItems = (props) => {
    const checkList = props.data.checkList;
    return (
        <div className={styles["Section-Container"]}>
            <div className={styles["Checklist-Container"]}>
                <div className={styles["Content-Heading"]}>
                    <h2>Coming Up - Checklist</h2><input className={styles["Search-Bar"]} type="text"
                                                        placeholder="Search"/>
                </div>
                <div className={styles["Checklist-Heading"]}>
                    <p></p><p className={styles["Left-Align"]}>CHECKLIST</p><p>CATEGORY</p><p>DUE DATE</p><p>PRIORITY</p><p>COMPLETE RATE</p>
                </div>
                {checkList.map((rowData, index) => {
                    return <div className={styles["Checklist-Item"]} key={index}>
                        <input type="checkbox" className={styles["Checklist-Checkbox"]}/>
                        <p className={styles["Item-Title"]}>{rowData.check_list_name}</p>
                        <p className={styles["Item-Category"]}>{rowData.category}</p>
                        <p className={styles["Item-Due-Date"]}>{rowData.due_date} <span className={styles["DueDateCountdown"]}>(3d)</span></p>
                        <p className={styles["Priority-Low"]}>Low</p>
                        <p className={styles["CompleteRate-Due"]}>Due</p>
                    </div>
                })}
                </div>
            <div className={styles["Details-Sidebar"]}>
                <div className={styles["Top-Section"]}>
                    <p className={styles["Title-Text"]}>CREATE ENVIRONTMENT REACT</p>
                    <p className={styles["Create-Dashboard"]}>Create Dashboard</p>
                    <p className={styles["Detail-Priority-High"]}>High</p>
                </div>
                <div className={styles["Middle-Section"]}>
                    <div><p className={styles["Label"]}>Status</p><p className={styles["Value"]}>Active</p></div>
                    <div><p className={styles["Label"]}>Due Date</p><p  className={styles["Value"]}>2018-09-22 (3d)</p></div>
                    <div><p className={styles["Label"]}>Completion Date</p><p  className={styles["Value"]}>-</p></div>
                    <div><p className={styles["Label"]}>Created Date</p><p  className={styles["Value"]}>2018-09-10</p></div>
                    <div><p className={styles["Label"]}>Created By</p><p  className={styles["Value"]}>SM ORG</p></div>
                    <div></div>
                    <div className={styles["Grid-Span"]}><p className={styles["Label"]}>Description</p><p className={styles["Value"]}>Curabitur lobortis id lorem id bibenum. Ut id consectetur magna. Quisque.</p></div>
                </div>

                <div className={styles["Bottom-Section"]}>
                <p className={styles["Contact-Info"]}>CONTACT INFO</p>
                    <div className={styles["Grid"]}>
                        <div><p className={styles["Label"]}>Phone</p><p  className={styles["Value"]}>+123 456 789</p></div>
                        <div><p className={styles["Label"]}>Fax</p><p  className={styles["Value"]}>+123 456 789</p></div>
                        <div><p className={styles["Label"]}>Email</p><p  className={styles["Value"]}>cc@mail.com</p></div>
                        <div><p className={styles["Label"]}>Website</p><p  className={styles["Value"]}>www.ccrect.com</p></div>
                        </div>
                </div>
            </div>
        </div>
    )

};