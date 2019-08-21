/* eslint-disable react/prop-types */
/* global localStorage */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import jquery from 'jquery';

import css from './TopBarComponent.m.scss';
import defaultAvatar from '../../images/img_avatar.png';
import classnames from 'classnames';
import { ACCESS_TOKEN } from '../../constants';
import { getAvatarUrl, navigate } from '../../helpers';

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
    const avatar = getAvatarUrl();
    return (
      <div className={css.UserInfo} onClick={props.onShowMenu}>
        <img alt="chevron" src="/images/chevron-down.svg" className={css['top-bar-chevron-down']} />
        <p className={css['top-bar-username']}>{props.user && props.user.first_name + ' ' + props.user.last_name}</p>
        <img alt="" className={`${css['top-bar-avatar-sm']} top-bar-avatar-sm`} src={props.user && (avatar || defaultAvatar)} />
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
    this.onShowHideNavbar = this.onShowHideNavbar.bind(this)
  }

  // side navbar work in progress
  hideNavbar = () => {
    const applicationcontainer =  document.getElementById("applicationcontainer");
    const event = jquery(`[data-navbar='open']`);
    event.animate({left: '-246px'}, 1000, () => {
      event.attr('data-navbar', 'close');
      applicationcontainer.removeEventListener("click", () => {});
    });
  }
  showNavbar = () => {
    const applicationcontainer =  document.getElementById("applicationcontainer");
    const event = jquery(`[data-navbar='close']`);
    event.animate({left: '0px'}, 1000, () => {
      event.attr('data-navbar', 'open');
      applicationcontainer.addEventListener("click", () => {
        this.hideNavbar();
      });
    });
  }
  onShowHideNavbar = () => {
    const navbarClose = jquery(`[data-navbar='close']`);
    const navbarOpen = jquery(`[data-navbar='open']`);
    if (navbarClose && navbarClose.length) {
      this.showNavbar();
    }
    if(navbarOpen && navbarOpen.length) {
      this.hideNavbar();
    }
  }

  onShowMenu() {
    console.log('onShowMenu');
    this.setState((state) => ({
      isOpenMenu: !state.isOpenMenu,
    }));
  }

  render() {
    const { user } = this.props;
    return (
      <nav className={css['top-bar-container']}>
        <div className={css['desktop']}>
          <Link className={css['top-bar-icon-link']} to="/">
            <img src="images/shape.svg" className={css['top-bar-icon']} onClick={this.onShowHideNavbar} alt="" />
          </Link>
        </div>
        <div className={css['mobile']}>
          <span className={css['top-bar-icon-link']}>
            <img src="images/shape.svg" className={css['top-bar-icon']} onClick={this.onShowHideNavbar} alt="" />
          </span>
        </div>
        <h5 className={`${css['top-bar-welcome-container']} ${css['desktop']}`}>
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
