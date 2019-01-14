import React from 'react';
import Link from 'react-router-dom/es/Link';

import styles from './TopBarComponent.module.css';
import defaultAvatar from '../../images/img_avatar.png';

export const TopBarComponent = props => {
  let { user } = props;

  const getAvatarSrc = () => {
    if (
      user.photo !== null &&
      user.photo !== 'null' &&
      user.photo !== undefined
    ) {
      return user.photo;
    } else {
      return defaultAvatar;
    }
  };

  return (
    <nav className={styles['top-bar-container']}>
      <Link className={styles['top-bar-icon-link']} to="/">
        <img src="images/shape.svg" className={styles['top-bar-icon']} alt="" />
      </Link>
      <h5 className={styles['top-bar-welcome-container']}>
        <span className={styles['top-bar-welcome-text']}>Welcome</span>
        &nbsp;
        <span className={styles['top-bar-user-full-name']}>
          {user.first_name + ' ' + user.last_name}
        </span>
      </h5>
      <img
        alt="chevron"
        src="/images/chevron-down.svg"
        className={styles['top-bar-chevron-down']}
      />
      <p className={styles['top-bar-username']}>
        {user.first_name + ' ' + user.last_name}
      </p>
      <img
        alt=""
        className={styles['top-bar-avatar-sm']}
        src={getAvatarSrc()}
      />
      <img
        alt="comment"
        src="/images/comment.svg"
        className={styles['top-bar-comment']}
      />
      <img
        alt="bell"
        src="/images/bell.svg"
        className={styles['top-bar-bell']}
      />
    </nav>
  );
};
