import React from 'react';
import styles from './MilestoneHeaderComponent.module.css';

export const MilestoneHeaderComponent = (props) => {

    return (
        <div className={styles["headerContainter"]}>
            <div className={styles["navText"]}>Academic <span> > EE</span></div>
            <button onClick={props.toggleCommonInfoVisibility}>{props.commonInfoVisibility ? "Hide Info" : "Show Info"}</button>
        </div>
    )
}
export default MilestoneHeaderComponent;