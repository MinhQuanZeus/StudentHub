/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { format } from 'date-fns';
import HeaderComponent from '../HeaderComponent/HeaderComponent';
import ChecklistSidebar from './ChecklistSidebar/ChecklistSidebar';
import SubChecklistSidebar from './SubChecklistSidebar/SubChecklistSidebar';
import { replaceUnderscoreAndUppercase } from '../../helpers/Utils';
import { Icon } from 'office-ui-fabric-react';

import styles from './ChecklistComponent.module.css';
import { AppContext } from '../../containers/AppContext';

function SubChecklist({ items, idx, openChecklistIdx, openSubChecklistIdx, toggleChecklistDetails, priorityStatus, setDone }) {
  const activeStyles = {
    color: '#413d59',
    fontWeight: 900,
    backgroundColor: '#f0eff6',
    borderLeft: '2px solid #6647ff',
  };
  return (
    <div className={styles['sub-checklist-container']} style={openChecklistIdx === idx ? { display: 'block' } : { display: 'none' }}>
      {items.length > 0 &&
        items.map((sub, idx) => (
          <div key={idx} className={styles['sub-checklist']} onClick={() => toggleChecklistDetails(idx, sub, 'subChecklist')}>
            <div style={openSubChecklistIdx === idx ? activeStyles : null}>
              <input
                type="checkbox"
                className={styles['checklist-checkbox']}
                checked={sub.processing === 100}
                onChange={($event) => setDone(sub.id, $event.target.checked)}
              />
              <p className={`${styles['item-title']} ${styles['left-align']}`}>{sub.check_list_name}</p>
              <p />
              <p className={styles['item-due-date']}>
                <span>{format(sub.due_date, 'YYYY-MM-DD')}&nbsp;</span>
                {/* <span className={styles['item-due-date-count']}>({distanceInWordsToNow(new Date(sub.due_date))})</span> */}
              </p>
              <p className={`${styles['priority']} ${styles[priorityStatus]}`}>{sub.priority}</p>
            </div>
          </div>
        ))}
    </div>
  );
}

function ChecklistHeading({ sort, updateSorting }) {
  const headerNames = ['checklist', 'category', 'due_date', 'priority', 'complete_rate'];
  const headerStyles = {
    color: '#6647ff',
  };
  const caretIcon = sort.order === 'asc' ? 'fa fa-caret-up' : 'fa fa-caret-down';

  return (
    <div className={styles['checklist-heading']}>
      <p />
      {headerNames.map((name, idx) => {
        const newName = replaceUnderscoreAndUppercase(name);
        if (idx === 0) {
          return (
            <p className={styles['left-align']} key={idx}>
              {newName}
            </p>
          );
        }
        if (name === 'complete_rate') {
          return <p key={idx}>{newName}</p>;
        }

        return (
          <p key={idx}>
            <span
              className={styles['column-name-sortable']}
              style={name === sort.columnName ? headerStyles : null}
              onClick={() => updateSorting(name)}
            >
              {newName}
              {name !== sort.columnName ? <i className="fa fa-caret-down" /> : <i className={caretIcon} />}
            </span>
          </p>
        );
      })}
    </div>
  );
}

function Sidebar({ openChecklistIdx, openChecklistDetails, openSubChecklistIdx, openSubChecklistDetails, goBackToChecklist }) {
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
    );
  }

  return sidebar;
}

class ChecklistComponent extends Component {
  getCompleteRate(checklist) {
    if (checklist.child.length === 0) {
      return checklist.processing === 100 ? (
        <p className={`${styles['complete-rate']} ${styles['complete-rate-done']}`}>Done</p>
      ) : (
        <p className={`${styles['complete-rate']} ${styles['complete-rate-not-started']}`}>Not Started</p>
      );
    }

    if (checklist.processing === 0) {
      return <p className={`${styles['complete-rate']} ${styles['complete-rate-not-started']}`}>Not Started</p>;
    } else if (checklist.processing === 100) {
      return <p className={`${styles['complete-rate']} ${styles['complete-rate-done']}`}>Done</p>;
    }

    return <p style={{ color: '#585661' }}>{checklist.processing}%</p>;
  }

  getSubChecklistLength(checklist) {
    return checklist.child.length ? <span style={{ marginLeft: '5px' }}>({checklist.child.length})</span> : null;
  }

  render() {
    const {
      items,
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
              <i className="fa fa-search" />
              <input type="text" placeholder="Search" name="search" value={searchValue} onChange={updateValue} />
            </div>
          </HeaderComponent>

          <ChecklistHeading sort={sort} updateSorting={updateSorting} />

          <div className="checklist-items">
            {items.map((rowData, idx) => {
              const activeChecklist = openChecklistIdx === idx ? 'active' : '';
              const activeSubChecklist = openChecklistIdx === idx && openSubChecklistIdx !== null ? 'active-sub-checklist' : '';
              const priorityStatus = `priority-${rowData.priority.toLowerCase()}`;
              // const due_date_count = differenceInMilliseconds(new Date(), new Date(rowData.due_date));
              return (
                <div key={idx} className={styles['checklist-box']}>
                  <div
                    className={`${styles['checklist-item']} ${styles[activeChecklist]} ${styles[activeSubChecklist]}`}
                    onClick={() => toggleChecklistDetails(idx, rowData, 'checklist')}
                  >
                    <input
                      type="checkbox"
                      className={styles['checklist-checkbox']}
                      checked={rowData.processing === 100}
                      onChange={($event) => this.props.setDone(rowData.id, $event.target.checked)}
                    />
                    <p className={`${styles['item-title']} ${styles['left-align']}`}>
                      {rowData.child.length !== 0 && <Icon iconName={openChecklistIdx === idx ? 'ChevronDown' : 'ChevronRight'} />}
                      &nbsp;
                      {rowData.check_list_name}
                      {this.getSubChecklistLength(rowData)}
                    </p>
                    <p className={styles['item-category']}>{rowData.category}</p>
                    <p className={styles['item-due-date']}>
                      <span>{format(rowData.due_date, 'YYYY-MM-DD')}&nbsp;</span>
                      {/* {due_date_count > 0 && (
                        <span className={styles['item-due-date-count']}>({distanceInWordsToNow(rowData.due_date)})</span>
                      )} */}
                    </p>
                    <p className={`${styles['priority']} ${styles[priorityStatus]}`}>{rowData.priority}</p>
                    {this.getCompleteRate(rowData)}
                  </div>
                  <SubChecklist
                    items={rowData.child}
                    idx={idx}
                    openChecklistIdx={openChecklistIdx}
                    openSubChecklistIdx={openSubChecklistIdx}
                    toggleChecklistDetails={toggleChecklistDetails}
                    priorityStatus={priorityStatus}
                    setDone={this.props.setDone}
                  />
                </div>
              );
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
    );
  }
}

ChecklistComponent.contextType = AppContext;

export default ChecklistComponent;
