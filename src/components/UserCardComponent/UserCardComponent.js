import React from 'react';
import styles from './UserCardComponent.css'

export const UserCardComponent = (props) => {

    return (
        <div className={styles["UserCardContainer"]}>
            <div className={styles["UserAvatar"]}><img alt="User Avatar">{/*remove border after pic added */}</img></div>
            <div className={styles["UserName"]}><p>Yujie Lin</p></div>
            <div className={styles["UserMajor"]}><p>Computer Science, BS</p></div>
            <div className={styles["ShowMoreBtn"]}><a>Show More</a></div>
        </div>

    )
};