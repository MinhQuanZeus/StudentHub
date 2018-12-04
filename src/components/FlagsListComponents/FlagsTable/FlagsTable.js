import React from 'react';
import { getDayMonthYearFormat } from '../../../helpers/Utils'

import styles from './FlagsTable.css';

function FlagsTable({ headerLabels, flags }) {
  return (
    <section>
      <div className={styles['table-border-line']}></div>
      <table id={styles['table']} className='table'>
        <thead>
          <tr>
            {headerLabels.map((label, idx) => <th key={idx} className={styles['header-label']}>{label}</th>)}
          </tr>
        </thead>
        <tbody>
          {flags.map((flag, idx) => (
            <tr key={idx} className={styles['table-body-row']}>
              <td>{flag.id}</td>
              <td>{flag.created_by}</td>
              <td>{flag.subject}</td>
              <td>{flag.category}</td>
              <td>{flag.sub_category}</td>
              <td>{getDayMonthYearFormat(flag.created_at)}</td>
              <td>
                <span className={styles[`${flag.status.toLowerCase()}`]}>
                  {flag.status}
                </span>
              </td>
              <td>{flag.severity}</td>
              <td>{flag.priority}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

export default FlagsTable;
