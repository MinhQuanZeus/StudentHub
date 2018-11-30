import React from 'react';
import styles from './TableComponent.css';
import classnames from 'classnames';
import { getYear } from '../../helpers/Utils';

export const TableComponent = ({ data, year, term }) => {
    const getStatusStyles = (status) => {
      return status === 'not active' ? styles["inactive"] : styles[status];
    }
    
    const filteredData = data.filter((classData) => classData.term_season.toLowerCase() === term.toLowerCase() && getYear(classData.start_date) === year);
    return (
        <div className={styles["Table"]}>
            <div className={styles["table-header"]}>
                <p>Class</p> <p>Instructor</p> <p>Unit Hours</p> <p>Grade</p> <p>Status</p>
            </div>
            <div>
                {filteredData.map((rowData, index) => (
                    <div key={index} className={styles["table-row-even"]}>
                        <p>{rowData.class_id}</p>
                        <p>{rowData.instructor_name}</p>
                        <p>{rowData.unit_hours}</p>
                        <p>{rowData.grade}</p>
                        <p className={classnames(getStatusStyles(rowData.class_status))}>{rowData.class_status}</p>
                    </div>
                ))}
            </div>
        </div>
    )
};
