import React from 'react';
import styles from './TableComponent.module.css';
import classnames from 'classnames';
import { getYear } from '../../helpers/Utils';

export const TableComponent = ({ data, year, term }) => {
    console.log(JSON.stringify(data, null, 4));
    const getStatusStyles = (status) => {
      if (status.toUpperCase() === 'not started'.toUpperCase() || status.toUpperCase() === 'enrolled'.toUpperCase()) return styles["not_started"];
      else if (status.toUpperCase() === 'in progress'.toUpperCase()) return styles["in_progress"];
      else if (status.toUpperCase() === 'completed'.toUpperCase()) return styles["completed"];
      else if (status.toUpperCase() === 'fail'.toUpperCase()) return styles["delay"];
      else return styles[status];
    }

    const filteredData = data.filter((classData) => classData.term_season.toLowerCase() === term.toLowerCase() && getYear(classData.start_date) === year);
    return (
        <div className={styles["Table"]}>
            <div className={styles["table-header"]}>
                <p>Class</p> <p>Instructor</p> <p>Unit Hours</p> <p>Grade</p> <p>Status</p>
            </div>
            <div>
                {filteredData.map((rowData, index) => {
                  let status = rowData.class_status.toLowerCase();
                  return (
                      <div key={index} className={styles["table-row"]}>
                          <p>{rowData.class_id}</p>
                          <p>{rowData.instructor_name}</p>
                          <p>{rowData.unit_hours}</p>
                          <p>{rowData.grade}</p>
                          <p className={classnames(getStatusStyles(status))}>{status}</p>
                      </div>
                  )})}
            </div>
            <div className={styles['spacer']}></div>
        </div>
    )
};
