/* eslint-disable react/prop-types */
/* global localStorage */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import css from './TopBarComponent.module.scss';
import defaultAvatar from '../../images/img_avatar.png';
import classnames from 'classnames';
import { ACCESS_TOKEN } from '../../constants';
import { navigate } from '../../helpers';

class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.onLogout = this.onLogout.bind(this);
    if (!props.user) {
      navigate('/login');
    }
  }

  onLogout() {
    localStorage.removeItem(ACCESS_TOKEN);
    navigate('/login');
  }

  render() {
    const { props } = this;
    return (
      <div className={css.UserInfo} onClick={props.onShowMenu}>
        <img alt="chevron" src="/images/chevron-down.svg" className={css['top-bar-chevron-down']} />
        <p className={css['top-bar-username']}>{props.user && props.user.first_name + ' ' + props.user.last_name}</p>
        <img alt="" className={css['top-bar-avatar-sm']} src={props.user && (props.user.photo || defaultAvatar)} />
        {props.isOpenMenu ? (
          <ul className={classnames(css.Menu)}>
            <li onClick={this.onLogout}>
              <a>Logout</a>
            </li>
          </ul>
        ) : null}
      </div>
    );
  }
}

export class TopBarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenMenu: false,
    };

    this.onShowMenu = this.onShowMenu.bind(this);
  }

  onShowMenu() {
    this.setState((state) => ({
      isOpenMenu: !state.isOpenMenu,
    }));
  }

  render() {
    const { user } = this.props;
    return (
      <nav className={css['top-bar-container']}>
        <Link className={css['top-bar-icon-link']} to="/">
          <img src="images/shape.svg" className={css['top-bar-icon']} alt="" />
        </Link>
        <h5 className={css['top-bar-welcome-container']}>
          <span className={css['top-bar-welcome-text']}>Welcome</span>
          &nbsp;
          <span className={css['top-bar-user-full-name']}>{user && user.first_name + ' ' + user.last_name}</span>
        </h5>
        <UserInfo user={user} isOpenMenu={this.state.isOpenMenu} onShowMenu={this.onShowMenu} onLogout={this.onLogout} />
        <img alt="comment" src="/images/comment.svg" className={css['top-bar-comment']} />
        <img alt="bell" src="/images/bell.svg" className={css['top-bar-bell']} />
      </nav>
    );
  }
}
