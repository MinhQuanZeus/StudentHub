import React from 'react';
import FlagDetailsModal from '../../FlagManagerDetailsComponent/FlagDetailsModal/FlagDetailsModal';
import { getDayMonthYearFormat } from '../../../helpers/Utils'

import styles from './FlagsTable.css';

function getFieldValue(flag, activeTab) {
  switch (activeTab) {
    case 1:
      return <td>{flag.to}</td>;
    case 2:
      return null;
    default:
      return <td>{flag.created_by}</td>
  }
}

function FlagsTable({ headerLabels, flags, handleClick, activeTab, handleOpenModal, handleCloseModal, showModal }) {
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
            <tr key={idx} className={styles['table-body-row']} onClick={handleOpenModal}>
              <td>{flag.id}</td>
              {getFieldValue(flag, activeTab)}
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
      <FlagDetailsModal showModal={showModal} handleCloseModal={handleCloseModal} />
    </section>
  )
}

export default FlagsTable;
