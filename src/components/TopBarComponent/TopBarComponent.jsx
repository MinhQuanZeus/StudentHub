import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import css from './TopBarComponent.m.scss';
import defaultAvatar from '../../images/img_avatar.png';
import classnames from 'classnames';
import { ACCESS_TOKEN } from '../../constants';
import { getAvatarUrl, navigate } from '../../helpers';
import PropTypes from 'prop-types';

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
    this.onShowHideNavbar = this.onShowHideNavbar.bind(this);
  }

  slideNavbar = (status) => {
    const elem = document.querySelector(`[data-navbar]`);
    if (!elem) {
      return false;
    }
    const left = parseInt(elem.style.left) || (status === 'open' ? -247 : 0);
    if (left <= 0 && status === 'open') {
      elem.style.left = left + 10 + 'px';
      setTimeout(() => {
        this.slideNavbar(status);
      }, 10);
    } else if (left >= -247 && status === 'close') {
      elem.style.left = left - 10 + 'px';
      setTimeout(() => {
        this.slideNavbar(status);
      }, 10);
    } else {
      elem.style.left = status === 'open' ? '0px' : '-247px';
      elem.setAttribute('data-navbar', status);
    }
  };

  hideNavbar = () => {
    const applicationcontainer = document.getElementById('applicationcontainer');
    applicationcontainer.removeEventListener('click', this.hideNavbar);
    this.slideNavbar('close');
  };

  showNavbar = () => {
    const applicationcontainer = document.getElementById('applicationcontainer');
    applicationcontainer.addEventListener('click', this.hideNavbar);
    this.slideNavbar('open');
  };

  onShowHideNavbar = () => {
    const navbarClose = document.querySelector(`[data-navbar='close']`);
    const navbarOpen = document.querySelector(`[data-navbar='open']`);
    if (navbarClose) {
      this.showNavbar();
    }
    if (navbarOpen) {
      this.hideNavbar();
    }
  };

  onShowMenu() {
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
            <img src="images/shape.svg" className={css['top-bar-icon']} alt="" />
          </Link>
        </div>
        <div className={css['mobile']}>
          <span className={css['top-bar-icon-link']} onClick={this.onShowHideNavbar}>
            <div className={css['NavbarMenuBtn']}>
              <div className={css['Line1']}></div>
              <div className={css['Line2']}></div>
              <div className={css['Line3']}></div>
            </div>
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

UserInfo.propTypes = {
  user: PropTypes.object,
};

TopBarComponent.propTypes = {
  user: PropTypes.object,
};
