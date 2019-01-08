import React, { Component } from 'react';
import HeaderComponent from '../HeaderComponent/HeaderComponent';
import ChecklistSidebar from './ChecklistSidebar/ChecklistSidebar';
import SubChecklistSidebar from './SubChecklistSidebar/SubChecklistSidebar';
import { getDayMonthYearFormat, replaceUnderscoreAndUppercase } from '../../helpers/Utils';

import styles from './ChecklistComponent.module.css';


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
            <input type="checkbox" className={styles['checklist-checkbox']} checked={sub.is_completed} onChange={() => console.log('clicked')} />
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

function ChecklistHeading({ sort, updateSorting }) {
  const headerNames = ['checklist', 'category', 'due_date', 'priority', 'complete_rate'];
  const headerStyles = {
    color: '#6647ff',
  }
  const caretIcon = sort.order === 'asc' ? 'fa fa-caret-up' : 'fa fa-caret-down';

  return (
    <div className={styles["checklist-heading"]}>
      <p></p>
      {headerNames.map((name, idx) => {
        const newName = replaceUnderscoreAndUppercase(name);
        if (idx === 0) { return <p className={styles["left-align"]} key={idx}>{newName}</p> }
        if (name === 'complete_rate') { return <p key={idx}>{newName}</p>}

        return (
          <p key={idx}>
            <span className={styles['column-name-sortable']} style={name === sort.columnName ? headerStyles : null} onClick={() => updateSorting(name)}>
              {newName}
              {name !== sort.columnName
                ? <i className='fa fa-caret-down'></i>
                : <i className={caretIcon}></i>}
            </span>
          </p>
        )
      })}
    </div>
  )
}

function Sidebar({
  openChecklistIdx,
  openChecklistDetails,
  openSubChecklistIdx,
  openSubChecklistDetails,
  goBackToChecklist
}) {
  let sidebar = null;

  if (openChecklistIdx !== null && openSubChecklistIdx === null) {
    sidebar = <ChecklistSidebar openChecklistDetails={openChecklistDetails} />;
  } else if (openChecklistIdx !== null && openSubChecklistIdx !== null) {
    sidebar = (
      <SubChecklistSidebar
        openChecklistDetails={openChecklistDetails}
        openSubChecklistDetails={openSubChecklistDetails}
        goBackToChecklist={goBackToChecklist}
      />
    )
  }

  return sidebar;
}

class ChecklistComponent extends Component {
  getCompleteRate = (checklist) => {
    if (!checklist.sub_checklist_length) {
      return checklist.is_completed
        ? <p className={`${styles['complete-rate']} ${styles['complete-rate-done']}`}>Done</p>
        : <p className={`${styles['complete-rate']} ${styles['complete-rate-not-started']}`}>Not Started</p>
    }


    if (checklist.complete_rate === 0) {
      return <p className={`${styles['complete-rate']} ${styles['complete-rate-not-started']}`}>Not Started</p>
    } else if (checklist.complete_rate === 100) {
      return <p className={`${styles['complete-rate']} ${styles['complete-rate-done']}`}>Done</p>
    }

    return <p style={{'color': '#585661'}}>{checklist.complete_rate}%</p>
  }

  getSubChecklistLength = (checklist) => {
    return checklist.sub_checklist_length
      ? <span style={{'marginLeft': '5px'}}>({checklist.sub_checklist_length})</span>
      : null
  }

  render() {
    const {
      data,
      openChecklistIdx,
      openChecklistDetails,
      openSubChecklistIdx,
      openSubChecklistDetails,
      toggleChecklistDetails,
      searchValue,
      updateValue,
      sort,
      updateSorting,
      goBackToChecklist,
    } = this.props;

    return (
      <section className={styles['checklist-container']}>
        <section className={`${styles['checklist']} ${openChecklistIdx === null ? styles['detail-close'] : styles['detail-open']}`}>
          <HeaderComponent labels={['Coming Up - Checklist']}>
            <div className={styles['checklist-search-box']}>
              <i className='fa fa-search'></i>
              <input type='text' placeholder='Search' name='search' value={searchValue} onChange={updateValue} />
            </div>
          </HeaderComponent>

          <ChecklistHeading sort={sort} updateSorting={updateSorting} />

          <div className='checklist-items'>
            {data.checkList.map((rowData, idx) => {
              const activeChecklist = openChecklistIdx === idx ? 'active' : '';
              const activeSubChecklist = openChecklistIdx === idx && openSubChecklistIdx !== null ? 'active-sub-checklist' : '';
              const priorityStatus = `priority-${rowData.priority.toLowerCase()}`;
              return (
                <div key={idx} className={styles['checklist-box']}>
                  <div className={`${styles['checklist-item']} ${styles[activeChecklist]} ${styles[activeSubChecklist]}`} onClick={() => toggleChecklistDetails(idx, rowData, 'checklist')}>
                    <input type="checkbox" className={styles['checklist-checkbox']} checked={rowData.is_completed} onChange={() => console.log('clicked')} />
                    <p className={`${styles['item-title']} ${styles['left-align']}`}>
                      {rowData.check_list_name}
                      {this.getSubChecklistLength(rowData)}
                    </p>
                    <p className={styles['item-category']}>{rowData.category}</p>
                    <p className={styles['item-due-date']}>{getDayMonthYearFormat(rowData.due_date)}</p>
                    <p className={`${styles['priority']} ${styles[priorityStatus]}`}>{rowData.priority}</p>
                    {this.getCompleteRate(rowData)}
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
        <Sidebar
          openChecklistIdx={openChecklistIdx}
          openChecklistDetails={openChecklistDetails}
          openSubChecklistIdx={openSubChecklistIdx}
          openSubChecklistDetails={openSubChecklistDetails}
          goBackToChecklist={goBackToChecklist}
        />
      </section>
    )
  }
}

export default ChecklistComponent;
