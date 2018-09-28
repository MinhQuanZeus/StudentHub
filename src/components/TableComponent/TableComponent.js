import React from 'react';
import styles from './TableComponent.css';

export const TableComponent = (props) => {

    return (
        <div className={styles["Table"]}>
            <div className={styles["table-header"]}>
            <p>Class</p> <p>Instructor</p> <p>Unit Hours</p> <p>Grade</p> <p>Status</p>
            </div>
            <div className={styles["table-row-even"]}>
            <p>Class A</p> <p>John Doe</p> <p>3</p> <p>A</p> <p className={styles["status-completed"]}>Completed</p>
            </div>
            <div className={styles["table-row-odd"]}>
            <p>Class B</p> <p>John Doe</p> <p>3</p> <p>F</p> <p className={styles["status-fail"]}>Fail</p>
            </div>
            <div className={styles["table-row-even"]}>
            <p>Class C</p> <p>John Doe</p> <p>4</p> <p>-</p> <p className={styles["status-inProgress"]}>In Progress</p>
            </div>
            <div className={styles["table-row-odd"]}>
            <p>Class D</p> <p>John Doe</p> <p>3</p> <p>A</p> <p className={styles["status-completed"]}>Completed</p>
            </div>
            <div className={styles["table-row-even"]}>
            <p>Class E</p> <p>John Doe</p> <p>0</p> <p>-</p> <p className={styles["status-notStarted"]}>Not Started</p>
            </div>
            <div className={styles["table-row-odd"]}>
            <p></p> <p></p> <p></p> <p></p> <p></p>
            </div>
        </div>







    )
};