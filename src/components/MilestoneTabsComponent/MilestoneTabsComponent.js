import React, { Component } from 'react';
import styles from './MilestoneTabsComponent.css';
import { Link } from "react-router-dom";

export class MilestoneTabsComponent extends Component {
    render() {
      const activeStyle = {
        milestone: this.props.currentPath === '/milestone' ? { borderBottom: '3px solid #6647ff' } : { borderBottom: 'none' },
        degreeAudit: this.props.currentPath === '/degree-audit' ? { borderBottom: '3px solid #6647ff' } : { borderBottom: 'none' }
      }

      return (
          <div className={styles["tab-container"]}>
              <div className={styles["milestone-tab"]} style={activeStyle.milestone}>
                <p><Link to="/milestone">Milestone</Link></p>
              </div>
              <div className={styles["degreeAudit-tab"]} style={activeStyle.degreeAudit}>
                <p><Link to="/degree-audit">Degree Audit</Link></p>
              </div>
              <div className={styles["spacer"]}></div>
          </div>
      )
    }
}
