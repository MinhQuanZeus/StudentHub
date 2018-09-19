import React from 'react';
import Link from "react-router-dom/es/Link";

import styles from './TopBarComponent.css';


export const TopBarComponent = (props) => {
    let {loginInformation} = props;

    return (
        <nav className={styles["top-bar-container"]}>
            <Link className={styles["top-bar-icon-link"]} to="/"><img src="images/shape.svg" className={styles["top-bar-icon"]} alt=""></img></Link>
            <h5 className={styles["top-bar-welcome-container"]}>
                <span className={styles["top-bar-welcome-text"]}>Welcome</span>
                &nbsp;
                <span className={styles["top-bar-user-full-name"]}>{loginInformation.first_name + " " + loginInformation.last_name}</span>
            </h5>
            {/* THE FOLLOWING ELEMENTS MUST BE IN RIGHT TO LEFT ORDER*/}
            <img alt="chevron"src="/images/chevron-down.svg" className={styles["top-bar-chevron-down"]}></img>
            <p className={styles["top-bar-username"]}>{loginInformation.first_name + " " + loginInformation.last_name}</p>
            <img alt="" className={styles["top-bar-avatar-sm"]}>{loginInformation.photo}</img>
            <img alt="comment" src="/images/comment.svg" className={styles["top-bar-comment"]}></img>
            <img alt="bell" src="/images/bell.svg" className={styles["top-bar-bell"]}></img>
        </nav>
    )
}