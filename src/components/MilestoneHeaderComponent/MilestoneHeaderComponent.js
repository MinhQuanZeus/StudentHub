import React from 'react';
import styles from './MilestoneHeaderComponent.css';

export const MilestoneHeaderComponent = (props) => {

    return(
        <div className={styles["headerContainter"]}>
            <div className={styles["navText"]}>Academic <span> > EE</span></div>
            {/*<button>Hide Info</button>*/}
        </div>
    )
}
export default MilestoneHeaderComponent;