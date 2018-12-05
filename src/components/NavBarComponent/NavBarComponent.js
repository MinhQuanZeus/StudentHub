import React from 'react';
import Link from "react-router-dom/es/Link";
import styles from './NavBarComponent.css';

export const NavBarComponent = (props) => {

    return (
        <div className={styles["nav-bar"]}>
            <ul className={styles["nav-bar-list"]}>
                <li><Link to="#"><img alt="dashboard" src="/images/dashboard.svg"/></Link></li>
                <li><Link to="/my-profile"><img alt="my profile" src="/images/myProfile.svg"/></Link></li>
                <li><Link to="/class-tracker"><img alt="academic" src="/images/academic.svg"/></Link></li>
                <li><Link to="/success-team"><img alt="success" src="/images/success.svg"/></Link></li>
                <li><Link to="/check-list"><img alt="check list" src="/images/success.svg"/></Link></li>
                <li><Link to="/flags"><img alt="flags list" src="/images/success.svg"/></Link></li>
                <li><Link to="/calendar"><img alt="/calendar" src="/images/success.svg"/></Link></li>
            </ul>
        </div>
    )

};
