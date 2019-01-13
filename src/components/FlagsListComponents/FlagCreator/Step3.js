import React, { Component } from 'react';
import css from './Step3.module.scss';
import classnames from 'classnames';
import UserSelector from './UserSelector';
import { API_END_POINT, GET_STAFFS } from '../../../constants/ApiUrl';
import { HTTP_GET, DEFAULT_FETCH_HEADERS } from '../../../constants';

class Step3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearching: false,
      staffs: []
    };

    this.sid = React.createRef();
    this.name = React.createRef();

    this.onFocus = this.onFocus.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onResponse = this.onResponse.bind(this);

    fetch(`${API_END_POINT}${GET_STAFFS}`, {
      method: HTTP_GET,
      headers: DEFAULT_FETCH_HEADERS
    })
      .then(response => response.json())
      .then(this.onResponse);
  }

  onResponse($json) {
    this.setState(state => (state.staffs = $json.data) && state);
  }

  onFocus($event) {
    this.setState(state => ({ isSearching: true }));
  }

  onChange($event, $user) {
    this.sid.current.value = $user.id;
    this.name.current.value = $user.name;
    this.setState({
      isSearching: false
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
            <input ref={this.sid} type="hidden" name="sid" />
            <input
              ref={this.name}
              name="name"
              onFocus={this.onFocus}
              readOnly
            />
            <i className="fas fa-angle-down" />
          </div>
          <UserSelector
            isSearching={this.state.isSearching}
            onChange={this.onChange}
            users={this.state.staffs}
          />
        </div>
      </div>
    );
  }
}

export default Step3;
