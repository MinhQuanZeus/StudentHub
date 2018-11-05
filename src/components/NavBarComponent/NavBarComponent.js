import React from 'react';
import Link from "react-router-dom/es/Link";
import styles from './NavBarComponent.css';

export const NavBarComponent = (props) => {

    return (
        <div className={styles["nav-bar"]}>
            <ul className={styles["nav-bar-list"]}>
                <li><Link to="#"><img className={styles["nav-dashboard-btn"]} alt="dashboard" src="/images/dashboard.svg"></img></Link></li>
                <li><Link to="/my-profile"><img className={styles["nav-myProfile-btn"]} alt="my profile" src="/images/myProfile.svg"></img></Link></li>
                <li><Link to="/class-tracker"><img className={styles["nav-academic-btn"]} alt="academic" src="/images/academic.svg"></img></Link></li>
                <li><Link to="/success-team"><img className={styles["nav-success-btn"]} alt="success" src="/images/success.svg"></img></Link></li>
            </ul>
        </div>
    )

};