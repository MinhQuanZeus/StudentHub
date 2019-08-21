import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NavBarComponent.module.scss';

export const NavBarComponent = (props) => {
  return (
    <div className={styles.Navbar}>
      <div className={`${styles.NavbarContainer} ${styles.HideNavbar}`} data-navbar="close">
        <div className={styles.NavbarItem}>
          <ul className={styles.NavbarList}>
            <li>
              <Link to="#">
                <img alt="dashboard" src="/images/dashboard.svg" />
                <span className={styles.NavbarTitle}>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/my-profile">
                <img alt="my profile" src="/images/myProfile.svg" />
                <span className={styles.NavbarTitle}>Profile</span>
              </Link>
            </li>
            <li>
              <Link to="/class-tracker">
                <img alt="academic" src="/images/academic.svg" />
                <span className={styles.NavbarTitle}>Academic</span>
              </Link>
            </li>
            <li>
              <Link to="/success-team">
                <img alt="success" src="/images/success.svg" />
                <span className={styles.NavbarTitle}>Team</span>
              </Link>
            </li>
            <li>
              <Link to="/check-list">
                <img alt="check list" src="/images/success.svg" />
                <span className={styles.NavbarTitle}>Checklist</span>
              </Link>
            </li>
            <li>
              <Link to="/flags">
                <img alt="flags list" src="/images/flag.svg" />
                <span className={styles.NavbarTitle}>Calendar</span>            
              </Link>
            </li>
            <li>
              <Link to="/calendar">
                <img alt="/calendar" src="/images/success.svg" />
                <span className={styles.NavbarTitle}>Team</span>            
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
