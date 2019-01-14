import React, { Component } from 'react';
import css from './Step4.module.scss';
import UserSelector from './UserSelector';
import classnames from 'classnames';
import Actions from './Actions';

export const SelectedUser = props => {
  return (
    <ul className={css.SelectedUser}>
      {props.selectedUsers &&
        props.selectedUsers.map($user => (
          <li key={$user.id} className={css.Avatar}>
            <img src="/images/avatar.jpeg" alt="avatar" />
            <span onClick={$event => props.onRemove($event, $user)}>
              <i className="fas fa-times" />
            </span>
          </li>
        ))}
    </ul>
  );
};

class Step4 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedUsers: []
    };
    this.onSelect = this.onSelect.bind(this);
    this.onRemove = this.onRemove.bind(this);
    this.onNext = this.onNext.bind(this);
    this.onPrevious = this.onPrevious.bind(this);
  }

  onNext($event) {
    $event.preventDefault();
    this.props.onNext(this.state);
  }

  onPrevious($event) {
    $event.preventDefault();
    this.props.onPrevious(this.state);
  }

  onSelect($event, $user) {
    const { state } = this;
    const obj = state.selectedUsers.filter(user => user.id === $user.id);
    if (obj && obj.length === 0) {
      this.setState(state => state.selectedUsers.push($user) && state);
    }
  }

  onRemove($event, $user) {
    this.setState(state => ({
      selectedUsers: state.selectedUsers.filter(user => user.id !== $user.id)
    }));
  }

  render() {
    const { props } = this;
    return (
      <div
        className={classnames(
          css.Step4,
          this.props.current !== 4 && css.Hidden
        )}
      >
        {this.state.selectedUsers && this.state.selectedUsers.length > 0 && (
          <div className={css.Selected}>
            {this.state.selectedUsers.length} Selected
          </div>
        )}
        <SelectedUser
          selectedUsers={this.state.selectedUsers}
          onRemove={this.onRemove}
        />
        <label htmlFor="receiver">
          Other people you would like to tag to this flag:{' '}
        </label>
        <UserSelector
          isSearching={true}
          onChange={this.onSelect}
          users={props.students}
        />
        <Actions
          current={props.current}
          onNext={this.onNext}
          onPrevious={this.onPrevious}
        />
      </div>
    );
  }
}

export default Step4;
