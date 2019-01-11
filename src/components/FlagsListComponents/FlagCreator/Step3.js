import React, { Component } from 'react';
import css from './Step3.module.scss';
import classnames from 'classnames';
import UserSelector from './UserSelector';

class Step3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearching: false,
      assignee: {
        id: null,
        fullName: ''
      }
    };
    this.onFocus = this.onFocus.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onFocus($event) {
    this.setState(state => ({ isSearching: true }));
  }

  onChange($event, $user) {
    this.setState({
      isSearching: false,
      assignee: $user
    });
  }
  render() {
    return (
      <div
        className={classnames(
          css.Step3,
          this.props.current !== 3 && css.Hidden
        )}
      >
        <div className={css.Assignee}>
          <div className={css.FormItem}>
            <label htmlFor="assignee">
              I know who can take care of this flag:
            </label>
            <input
              id="assignee"
              name="assignee"
              onFocus={this.onFocus}
              value={this.state.assignee && this.state.assignee.fullName}
              readOnly
            />
            <i className="fas fa-angle-down" />
          </div>
          <UserSelector
            isSearching={this.state.isSearching}
            onChange={this.onChange}
            users={[
              { id: 1, fullName: 'Michael Anto', active: true },
              { id: 2, fullName: 'Milano Messi', active: false },
              { id: 3, fullName: 'Misdi Koloni', active: false }
            ]}
          />
        </div>
      </div>
    );
  }
}

export default Step3;
