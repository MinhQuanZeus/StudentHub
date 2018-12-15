import React from 'react';
import styles from './ChecklistComponent.css';
import { getDayMonthYearFormat } from '../../helpers/Utils';

export class ChecklistComponent extends React.Component {
  state = {
    openSubCheckListIdx: null,
  }

  toggleSubCheckList = (idx) => {
    if (this.state.openSubCheckListIdx === idx) {
      return this.setState({ openSubCheckListIdx: null });
    }

    return this.setState({ openSubCheckListIdx: idx });
  }

  render() {
    const checkList = this.props.data.checkList;
    return (
      <div style={{'marginBottom': '50px'}}>
        <div className={styles["Content-Heading"]}>
          <h2>Coming Up - Checklist</h2>
          <input className={styles["Search-Bar"]} type="text" placeholder="Search"/>
        </div>
        <div className={styles["Checklist-Heading"]}>
          <p></p>
          <p className={styles["Left-Align"]}>CHECKLIST</p>
          <p>CATEGORY</p>
          <p>DUE DATE</p>
          <p>PRIORITY</p>
          <p>COMPLETE RATE</p>
        </div>
        {checkList.map((rowData, index) => {
          rowData.sub_checklist = [{value: 'subchecklist 1'}, {value: 'subchecklist 2'}] // remove this line after api includes this field
          return (
            <div key={index}>
              <div className={`${styles["Checklist-Item"]} ${this.state.openSubCheckListIdx === index ? styles['active'] : ''}`} onClick={() => this.toggleSubCheckList(index)}>
                <input type="checkbox" className={styles["Checklist-Checkbox"]}/>
                <p className={styles["Item-Title"]}>{rowData.check_list_name}</p>
                <p className={styles["Item-Category"]}>{rowData.category}</p>
                <p className={styles["Item-Due-Date"]}>{getDayMonthYearFormat(rowData.due_date)} <span className={styles["DueDateCountdown"]}>(3d)</span></p>
                <p className={styles["Priority-Low"]}>Low</p>
                <p className={styles["CompleteRate-Due"]}>Due</p>
              </div>
              <div className={styles['sub-checklist-container']} style={this.state.openSubCheckListIdx === index ? {'display': 'initial'} : {'display': 'none'}}>
                {rowData.sub_checklist.length &&
                  rowData.sub_checklist.map((sub, idx) => (
                    <div key={idx} className={styles['sub-checklist']}>
                      <input type="checkbox" className={styles["Checklist-Checkbox"]}/>
                      <p className={styles["Item-Title"]}>{sub.value}</p>
                      <p></p>
                      <p className={styles["Item-Due-Date"]}>{getDayMonthYearFormat(rowData.due_date)} <span className={styles["DueDateCountdown"]}>(3d)</span></p>
                      <p className={styles["Priority-Low"]}>Low</p>
                      <p></p>
                    </div>
                  ))
                }
              </div>
            </div>
          )
        })}
      </div>
    )
  }
};
