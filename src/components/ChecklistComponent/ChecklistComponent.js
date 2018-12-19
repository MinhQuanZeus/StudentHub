import React from 'react';
import HeaderComponent from '../HeaderComponent/HeaderComponent';
import ChecklistSidebar from './ChecklistSidebar/ChecklistSidebar';
import SubChecklistSidebar from './SubChecklistSidebar/SubChecklistSidebar';
import { getDayMonthYearFormat } from '../../helpers/Utils';

import styles from './ChecklistComponent.css';


function SubChecklist({
  data,
  idx,
  openChecklistIdx,
  openSubChecklistIdx,
  toggleChecklistDetails,
  priorityStatus
}) {
  const activeStyles = {
    color: '#413d59',
    fontWeight: 900,
    backgroundColor: '#f0eff6',
  }
  return (
    <div className={styles['sub-checklist-container']} style={openChecklistIdx === idx ? {'display': 'block'} : {'display': 'none'}}>
      {data.sub_checklist.length
        ? data.sub_checklist.map((sub, idx) => (
          <div
            key={idx}
            className={styles['sub-checklist']}
            style={openSubChecklistIdx === idx ? activeStyles : null}
            onClick={() => toggleChecklistDetails(idx, sub, 'subChecklist')}
          >
            <p></p>
            <input type="checkbox" className={styles['checklist-checkbox']} />
            <p className={`${styles['item-title']} ${styles['left-align']}`}>{sub.sub_check_list_name}</p>
            <p></p>
            <p className={styles['item-due-date']}>{getDayMonthYearFormat(data.due_date)}</p>
            <p className={`${styles['priority']} ${styles[priorityStatus]}`}>{data.priority}</p>
            <p></p>
          </div>
        ))
        : null
      }
    </div>
  )
}

function ChecklistComponent({
  data,
  openChecklistIdx,
  openChecklistDetails,
  openSubChecklistIdx,
  openSubChecklistDetails,
  toggleChecklistDetails,
  searchValue,
  updateValue,
}) {
  return (
    <section className={styles['checklist-container']}>
      <section className={`${styles['checklist']} ${openChecklistIdx === null ? styles['detail-close'] : styles['detail-open']}`}>
        <HeaderComponent labels={['Coming Up - Checklist']}>
          <div className={styles['checklist-search-box']}>
            <i className='fa fa-search'></i>
            <input type='text' placeholder='Search' name='search' value={searchValue} onChange={updateValue} />
          </div>
        </HeaderComponent>

        <div className={styles["checklist-heading"]}>
          <p></p>
          <p className={styles["left-align"]}>CHECKLIST</p>
          <p>CATEGORY</p>
          <p>DUE DATE</p>
          <p>PRIORITY</p>
          <p>COMPLETE RATE</p>
        </div>

        <div className='checklist-items'>
          {data.checkList.map((rowData, idx) => {

            // remove start: remove this block when api includes these fields
            rowData.sub_checklist = [
              {
                sub_check_list_name: 'sub-checklist #1',
                priority: 'high',
                status: 'active',
                due_date: '2018-12-29T03:00:00.000Z',
                complete_rate: 'due',
                created_at: '2018-12-29T03:00:00.000Z',
                created_by: 1,
                description: 'some description',
                completion_date: '2018-12-29T03:00:00.000Z'
              }, {
                sub_check_list_name: 'sub-checklist #2',
                priority: 'low',
                status: 'pending',
                due_date: '2018-12-29T03:00:00.000Z',
                complete_rate: 'done',
                created_at: '2018-12-29T03:00:00.000Z',
                created_by: 1,
                description: 'some description',
                completion_date: '2018-12-29T03:00:00.000Z'
              }, {
                sub_check_list_name: 'sub-checklist #3',
                priority: 'medium',
                status: 'active',
                due_date: '2018-12-29T03:00:00.000Z',
                complete_rate: 'not started',
                created_at: '2018-12-29T03:00:00.000Z',
                created_by: 1,
                description: 'some description',
                completion_date: '2018-12-29T03:00:00.000Z'
              }
            ];
            rowData.priority = 'Low';
            // remove end
            
            const activeChecklist = openChecklistIdx === idx && openSubChecklistIdx === null ? 'active' : '';
            const priorityStatus = `priority-${rowData.priority.toLowerCase()}`;
            return (
              <div key={idx} className={styles['checklist-box']}>
                <div className={`${styles['checklist-item']} ${styles[activeChecklist]}`} onClick={() => toggleChecklistDetails(idx, rowData, 'checklist')}>
                  <input type='checkbox' className={styles['checklist-checkbox']} />
                  <p className={`${styles['item-title']} ${styles['left-align']}`}>{rowData.check_list_name}</p>
                  <p className={styles['item-category']}>{rowData.category}</p>
                  <p className={styles['item-due-date']}>{getDayMonthYearFormat(rowData.due_date)}</p>
                  <p className={`${styles['priority']} ${styles[priorityStatus]}`}>{rowData.priority}</p>
                  <p className={`${styles['complete-rate']} ${styles['complete-rate-due']}`}>DUE</p>
                </div>
                <SubChecklist
                  data={rowData}
                  idx={idx}
                  openChecklistIdx={openChecklistIdx}
                  openSubChecklistIdx={openSubChecklistIdx}
                  toggleChecklistDetails={toggleChecklistDetails}
                  priorityStatus={priorityStatus}
                />
              </div>
            )
          })}
        </div>
      </section>
      {openChecklistIdx !== null && openSubChecklistIdx === null
        && <ChecklistSidebar openChecklistDetails={openChecklistDetails} />}

      {openChecklistIdx !== null && openSubChecklistIdx !== null
        && <SubChecklistSidebar openChecklistDetails={openChecklistDetails} openSubChecklistDetails={openSubChecklistDetails} />}
    </section>
  )
}

export default ChecklistComponent;
