import React, {Component} from 'react';
import styles from './MilestoneTabsComponent.module.css';
import {Link} from "react-router-dom";

export class MilestoneTabsComponent extends Component {
    render() {
        const {currentPath, commonInfoVisibility} = this.props;
        const activeStyle = {
            milestoneBottomBorder: currentPath === '/milestone' ? {borderBottom: '3px solid #6647ff'} : {borderBottom: 'none'},
            degreeAuditBottomBorder: currentPath === '/degree-audit' ? {borderBottom: '3px solid #6647ff'} : {borderBottom: 'none'},
            milestoneText: currentPath === '/milestone' ? {color: '#6647ff'} : {color: '#544c7f'},
            degreeAuditText: currentPath === '/degree-audit' ? {color: '#6647ff'} : {color: '#544c7f'},
        }

        return (
            <div className={commonInfoVisibility ? styles["tab-container"] : styles["tab-container-no-info"]}>
                <div className={styles["milestone-tab"]} style={activeStyle.milestoneBottomBorder}>
                    <p><Link style={activeStyle.milestoneText} to="/milestone">Milestone</Link></p>
                </div>
                <div className={styles["degreeAudit-tab"]} style={activeStyle.degreeAuditBottomBorder}>
                    <p><Link style={activeStyle.degreeAuditText} to="/degree-audit">Degree Audit</Link></p>
                </div>
                <div className={styles["spacer"]}></div>
            </div>
        )
    }
}
