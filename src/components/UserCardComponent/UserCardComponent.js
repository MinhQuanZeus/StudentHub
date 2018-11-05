import React from 'react';
import styles from './UserCardComponent.css'

export const UserCardComponent = (props) => {

    let {first_name, last_name} = props.loginInformation;

    return (
        <div className={styles["UserCardContainer"]}>
            <div className={styles["UserAvatar"]}><img src="https://www.w3schools.com/howto/img_avatar.png" alt="User Avatar">{/*remove border after pic added */}</img></div>
            <div className={styles["UserName"]}><p>{first_name + ' ' + last_name}</p></div>
            <div className={styles["UserMajor"]}><p>Computer Science, BS</p></div>
            {/*<div className={styles["ShowMoreBtn"]}><a>Show More</a></div>*/}
        </div>

    )
};