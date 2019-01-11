import React, { Component } from 'react';
import classnames from 'classnames';
import css from './UserSelector.module.scss';

export const User = props => {
  return (
    <li className={css.User} onClick={props.onClick}>
      <img src="images/avatar.jpeg" alt="avatar" />
      <span className={classnames(css.Status, props.active && css.Active)} />
      <span>{props.fullName}</span>
    </li>
  );
};

class UserSelector extends Component {
  render() {
    const { props } = this;
    return (
      <div
        className={classnames(
          css.UserSelector,
          !props.isSearching && css.Hidden
        )}
      >
        <div className={css.Search}>
          <input type="text" />
          <i className="fas fa-search" />
        </div>
        <ul className={css.List}>
          {props.users &&
            props.users.map($user => (
              <User
                key={$user.id}
                {...$user}
                onClick={$event => props.onChange($event, $user)}
              />
            ))}
        </ul>
      </div>
    );
  }
}

export default UserSelector;
