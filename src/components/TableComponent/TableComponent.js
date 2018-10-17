import React from 'react';
import styles from './TableComponent.css';





export const TableComponent = (props) => {

const classTracker = props.data.classTracker;
    return (
        <div className={styles["Table"]}>
            <div className={styles["table-header"]}>
                <p>Class</p> <p>Instructor</p> <p>Unit Hours</p> <p>Grade</p> <p>Status</p>
            </div>
            <div>
            {classTracker.map((rowData, index)=>{
                return <div key={index} className={styles["table-row-even"]}>
                <p>{rowData.class_id}</p>
                <p>{rowData.instructor_name}</p>
                <p>{rowData.unit_hours}</p>
                <p>{rowData.grade}</p>
                <p className={styles[rowData.class_status]}>{rowData.class_status}</p>
                </div>
            })}
            </div>
        </div>
    )
};