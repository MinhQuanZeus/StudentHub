import React from 'react';
import HeaderComponent from '../HeaderComponent/HeaderComponent';
import { getDayMonthYearFormat } from '../../helpers/Utils';

import styles from './ChecklistComponent.css';


function ChecklistComponent({
  data,
  openSubChecklistIdx,
  openSubChecklistDetails,
  toggleSubChecklist,
  searchValue,
  updateValue,
}) {
  return (
    <section className={styles['checklist-container']}>
      <section className={`${styles['checklist']} ${openSubChecklistIdx === null ? styles['detail-close'] : styles['detail-open']}`}>
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
            rowData.sub_checklist = [{value: 'sub checklist #1'}, {value: 'sub checklist #2'}];
            rowData.priority = 'Low';
            // remove end

            const priorityStatus = `priority-${rowData.priority.toLowerCase()}`;
            return (
              <div key={idx}>
                <div className={`${styles['checklist-item']} ${openSubChecklistIdx === idx ? styles['active'] : ''}`} onClick={() => toggleSubChecklist(idx, rowData)}>
                  <input type='checkbox' className={styles['checklist-checkbox']} />
                  <p className={`${styles['item-title']} ${styles['left-align']}`}>{rowData.check_list_name}</p>
                  <p className={styles['item-category']}>{rowData.category}</p>
                  <p className={styles['item-due-date']}>{getDayMonthYearFormat(rowData.due_date)}</p>
                  <p className={`${styles['priority']} ${styles[priorityStatus]}`}>{rowData.priority}</p>
                  <p className={`${styles['complete-rate']} ${styles['complete-rate-due']}`}>DUE</p>
                </div>
                <div className={styles['sub-checklist-container']} style={openSubChecklistIdx === idx ? {'display': 'block'} : {'display': 'none'}}>
                  {rowData.sub_checklist.length
                    ? rowData.sub_checklist.map((sub, idx) => (
                      <div key={idx} className={styles['sub-checklist']}>
                        <input type="checkbox" className={styles['checklist-checkbox']} />
                        <p className={`${styles['item-title']} ${styles['left-align']}`}>{sub.value}</p>
                        <p></p>
                        <p className={styles['item-due-date']}>{getDayMonthYearFormat(rowData.due_date)}</p>
                        <p className={`${styles['priority']} ${styles[priorityStatus]}`}>{rowData.priority}</p>
                        <p></p>
                      </div>
                    ))
                    : null
                  }
                </div>
              </div>
            )
          })}
        </div>
      </section>
      <section className={styles['checklist-detail']} style={openSubChecklistIdx === null ? {'display': 'none'} : {'display': 'inline-block'}}>
        <div className={`${styles['name']} ${styles['detail-container']}`}>
          <h3>{openSubChecklistDetails.check_list_name}</h3>
          <div className={styles['sub-checklist-count']}><span>1</span></div>
        </div>
        <div className={`${styles['detail']} ${styles['detail-container']}`}>
          <div className={styles['detail-group']}>
            <span className={styles['label']}>Category</span>
            <p className={styles['value']}>{openSubChecklistDetails.category}</p>
          </div>
          <div className={styles['detail-group']}>
            <span className={styles['label']}>Sub Category</span>
            <p className={styles['value']}>{openSubChecklistDetails.sub_category_value}</p>
          </div>
          <div className={styles['detail-group-full']} style={{'paddingTop': '17px'}}>
            <span className={styles['label']}>Description</span>
            <p className={styles['description-value']}>{openSubChecklistDetails.description}</p>
          </div>
        </div>
        <div className={`${styles['contact']} ${styles['detail-container']}`}>
          <h4>CONTACT INFO</h4>
          <div className={styles['detail-group']}>
            <span className={styles['label']}>Phone</span>
            <p className={styles['value']}>{openSubChecklistDetails.phone}</p>
          </div>
          <div className={styles['detail-group']}>
            <span className={styles['label']}>Fax</span>
            <p className={styles['value']}>{openSubChecklistDetails.fax}</p>
          </div>
          <div className={styles['detail-group-full']} style={{'marginBottom': '19px'}}>
            <span className={styles['label']}>Email</span>
            <p className={styles['value']}>{openSubChecklistDetails.email}</p>
          </div>
          <div className={styles['detail-group-full']}>
            <span className={styles['label']}>Website</span>
            <p className={styles['value']}>{openSubChecklistDetails.website}</p>
          </div>
        </div>
      </section>
    </section>
  )
}

export default ChecklistComponent;
