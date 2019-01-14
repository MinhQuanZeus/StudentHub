import React, { Component } from 'react';
import css from './Step3.module.scss';
import classnames from 'classnames';
import UserSelector from './UserSelector';
import Actions from './Actions';
import { withFormik } from 'formik';

class Step3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearching: false
    };

    this.sid = React.createRef();
    this.name = React.createRef();

    this.onFocus = this.onFocus.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onNext = this.onNext.bind(this);
    this.onPrevious = this.onPrevious.bind(this);
  }

  onFocus($event) {
    this.setState(state => ({ isSearching: true }));
  }

  onChange($event, $user) {
    this.props.setFieldValue('assign_id', $user.id || '');
    this.props.setFieldValue('assign_name', $user.name || '');
    this.setState({
      isSearching: false
    });
  }

  onNext($event) {
    $event.preventDefault();
    this.props.onNext({ assign_id: parseInt(this.props.values.assign_id, 10) });
  }

  onPrevious($event) {
    $event.preventDefault();
    this.props.onPrevious({
      assign_id: parseInt(this.props.values.assign_id, 10)
    });
  }

  render() {
    const { props } = this;
    const { values } = this.props;
    return (
      <form
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
              ref={this.name}
              name="name"
              onFocus={this.onFocus}
              readOnly
              value={values.assign_name}
            />
            <i className="fas fa-angle-down" />
          </div>
          <UserSelector
            isSearching={this.state.isSearching}
            onChange={this.onChange}
            users={props.staffs}
          />
        </div>
        <Actions
          current={props.current}
          onNext={this.onNext}
          onPrevious={this.onPrevious}
        />
      </form>
    );
  }
}

export default withFormik({
  mapPropsToValues: () => ({
    assign_id: '',
    assign_name: ''
  })
})(Step3);
