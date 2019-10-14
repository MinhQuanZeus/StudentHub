import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NavBarComponent.module.scss';
import defaultAvatar from '../../images/img_avatar.png';
import { getAvatarUrl } from '../../helpers';
import { QuickLinkComponent } from '../../components/QuickLinkComponent/QuickLinkComponent';
import PropTypes from 'prop-types';

const quickLinkComponentStyle = {
  container: {
    left: '174px',
    border: 'none',
    backgroundColor: '#5335e7',
  },
};

export const NavBarComponent = (props) => {
  const avatar = getAvatarUrl();
  const { user, activeLink, onMouseEnter, onMouseLeave, quickLinkShow, onLogout } = props;
  return (
    <div className={styles.Navbar}>
      <div className={`${styles.NavbarContainer} ${styles.HideNavbar}`} data-navbar="close">
        <div className={styles.NavbarItem}>
          <div className={styles.UserInfo}>
            <div className={styles['UserAvatar']}>
              <img src={user && (avatar || defaultAvatar)} alt="User Avatar" />
            </div>
            <div className={styles['UserName']}>
              <p>{user && user.first_name + ' ' + user.last_name}</p>
            </div>
            <div className={styles['UserMajor']}>
              <p>Computer Science, BS</p>
            </div>
          </div>
          <ul className={styles.NavbarList}>
            <li className={activeLink === 'dashboard' ? styles.active : ''}>
              <Link to="#">
                <img alt="dashboard" src="/images/menu-icons/dashboard.svg" />
                <span className={styles.NavbarTitle}>Dashboard</span>
              </Link>
            </li>
            <li className={activeLink === 'my-profile' ? styles.active : ''}>
              <Link to="/my-profile">
                <img alt="my profile" src="/images/menu-icons/settings.svg" />
                <span className={styles.NavbarTitle}>Profile</span>
              </Link>
            </li>
            <li
              className={activeLink === 'class-tracker' ? styles.active : ''}
              onMouseEnter={() => onMouseEnter()}
              onMouseLeave={() => onMouseLeave()}
            >
              <Link to="/class-tracker">
                <img alt="academic" src="/images/menu-icons/graduation-cap.svg" />
                <span className={styles.NavbarTitle}>Academic</span>
              </Link>
            </li>
            <li className={activeLink === 'success-team' ? styles.active : ''}>
              <Link to="/success-team">
                <img alt="success" src="/images/menu-icons/team.svg" />
                <span className={styles.NavbarTitle}>Team</span>
              </Link>
            </li>
            <li className={activeLink === 'check-list' ? styles.active : ''}>
              <Link to="/check-list">
                <img alt="check list" src="/images/menu-icons/checklist.svg" />
                <span className={styles.NavbarTitle}>Checklist</span>
              </Link>
            </li>
            <li className={activeLink === 'calendar' ? styles.active : ''}>
              <Link to="/calendar">
                <img alt="/calendar" src="/images/menu-icons/calendar.svg" />
                <span className={styles.NavbarTitle}>Calendar</span>
              </Link>
            </li>
            <li className={activeLink === 'flags' ? styles.active : ''}>
              <Link to="/flags">
                <img alt="flags list" src="/images/menu-icons/flag.svg" />
                <span className={styles.NavbarTitle}>Flag</span>
              </Link>
            </li>
            <li>
              <div className={`${styles.MobileViewItem} ${styles.Logout}`} onClick={onLogout}>
                <img alt="/logout" src="/images/menu-icons/settings.svg" />
                <span className={styles.NavbarTitle}>Logout</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      {quickLinkShow && (
        <div onMouseEnter={() => onMouseEnter()} onMouseLeave={() => onMouseLeave()}>
          <QuickLinkComponent styles={quickLinkComponentStyle} />
        </div>
      )}
    </div>
  );
};

NavBarComponent.propTypes = {
  user: PropTypes.object,
  activeLink: PropTypes.string,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  quickLinkShow: PropTypes.bool,
  onLogout: PropTypes.func,
};
