/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import classnames from 'classnames';
import css from './UserSelector.module.scss';

export const User = (props) => {
  return (
    <li className={css.User} onClick={props.onClick}>
      <img src="images/avatar.jpeg" alt="avatar" />
      <span className={classnames(css.Status, props.active && css.Active)} />
      <span>{props.name}</span>
    </li>
  );
};

class UserSelector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: null,
      searchValue: '',
    };
    this.onSearch = this.onSearch.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    if ((!state.users || state.users.length === 0) && !state.searchValue) {
      state.users = props.users;
    }
    return state;
  }

  matchTwoString = (str1, str2) => {
    if (!str1 || !str2) {
      return false;
    }
    return str1.toLowerCase().indexOf(str2.toLowerCase()) > -1;
  };

  onSearch($event) {
    $event.preventDefault();
    const { value } = $event.target;
    this.setState((state) => ({
      users: this.props.users.filter((u) => this.matchTwoString(u.name, value)),
      searchValue: value,
    }));
  }

  render() {
    const { props, state } = this;
    return (
      <div className={classnames(css.UserSelector, !props.isSearching && css.Hidden)}>
        <div className={css.Search}>
          <input type="text" name="name" onChange={this.onSearch} />
          <i className="fas fa-search" />
        </div>
        <ul className={css.List}>
          {state.users &&
            state.users.map(($user) => <User key={$user.id} {...$user} onClick={($event) => props.onChange($event, $user)} />)}
        </ul>
      </div>
    );
  }
}

export default UserSelector;
