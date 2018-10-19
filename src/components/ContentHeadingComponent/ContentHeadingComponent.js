import React from 'react';
import styles from './ContentHeadingComponent.css';

export const ContentHeadingComponent = (props) => {

    return (
        <div className={styles["Content-Heading"]}>
        <h2 className={styles["heading"]}><span>Academic</span> > Class Tracker</h2>
        </div>
    )
};