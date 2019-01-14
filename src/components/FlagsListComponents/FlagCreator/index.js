import React, { Component } from 'react';
import { Popup } from '../Popup';
import { Stepper, Step } from '../Stepper';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import css from './FlagCreator.module.scss';
import {
  API_END_POINT,
  GET_FLAG_CATEGORIES,
  GET_STAFFS,
  GET_STUDENTS,
  CREATE_NEW_FLAG
} from '../../../constants/ApiUrl';
import {
  HTTP_GET,
  DEFAULT_FETCH_HEADERS,
  SHOW_LOADING,
  HIDE_LOADING,
  HTTP_POST
} from '../../../constants';
import { withEmit } from 'react-emit';

class FlagCreator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      current: 1
    };

    this.data = {};

    this.mounted = false;
    this.previous = this.previous.bind(this);
    this.next = this.next.bind(this);
    this.onReponse = this.onReponse.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.onError = this.onError.bind(this);
    props.emit(SHOW_LOADING);
    this.promise = Promise.all([
      fetch(`${API_END_POINT}${GET_FLAG_CATEGORIES}`, {
        method: HTTP_GET,
        headers: DEFAULT_FETCH_HEADERS
      }).then(response => response.json()),
      fetch(`${API_END_POINT}${GET_STAFFS}`, {
        method: HTTP_GET,
        headers: DEFAULT_FETCH_HEADERS
      }).then(response => response.json()),
      fetch(`${API_END_POINT}${GET_STUDENTS}`, {
        method: HTTP_GET,
        headers: DEFAULT_FETCH_HEADERS
      }).then(response => response.json())
    ]).then(this.onReponse);
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  onReponse($jsons) {
    this.props.emit(HIDE_LOADING);
    if (!this.mounted) {
      return;
    }
    this.setState(state => ({
      categories: $jsons[0].data.map(obj => {
        const subs = obj.subs.map(sub => ({
          id: sub.id,
          name: sub.category_name,
          parrentId: sub.parrent
        }));
        return { id: obj.id, name: obj.category_name, subs: subs };
      }),
      staffs: $jsons[1].data,
      students: $jsons[2].data
    }));
  }

  previous($values) {
    this.data = Object.assign(this.data, $values);
    this.setState(state => ({
      current: state.current > 1 ? state.current - 1 : 1
    }));
  }

  next($values) {
    this.data = Object.assign(this.data, $values);
    if (this.state.current === 4) {
      this.props.emit(SHOW_LOADING);
      fetch(`${API_END_POINT}${CREATE_NEW_FLAG}`, {
        method: HTTP_POST,
        body: JSON.stringify(this.data),
        headers: DEFAULT_FETCH_HEADERS
      })
        .then(response => response.json())
        .then(this.onSuccess)
        .catch(this.onError);
    }
    this.setState(state => ({
      current: state.current < 4 ? state.current + 1 : 4
    }));
  }

  onSuccess($json) {
    this.props.emit(HIDE_LOADING);
  }

  onError($json) {
    this.props.emit(HIDE_LOADING);
  }

  render() {
    const { props, state } = this;

    return (
      <Popup
        title="Create New Flag"
        isOpen={props.isOpen}
        className={css.FlagCreator}
        onRequestClose={props.onRequestClose}
      >
        <Stepper className={css.Stepper} current={state.current}>
          <Step
            index={1}
            title="Info"
            className={css.Step1}
            current={this.state.current}
          />
          <Step
            index={2}
            title="Details"
            className={css.Step2}
            current={this.state.current}
          />
          <Step
            index={3}
            title="Assign"
            className={css.Step3}
            current={this.state.current}
          />
          <Step
            index={4}
            title="Receiver"
            className={css.Step4}
            current={this.state.current}
          />
        </Stepper>
        <div className={css.Body}>
          <Step1
            current={state.current}
            categories={state.categories}
            onNext={this.next}
          />
          <Step2
            current={state.current}
            onNext={this.next}
            onPrevious={this.previous}
          />
          <Step3
            current={state.current}
            staffs={state.staffs}
            onPrevious={this.previous}
            onNext={this.next}
          />
          <Step4
            current={state.current}
            students={state.students}
            onNext={this.next}
            onPrevious={this.previous}
          />
        </div>
      </Popup>
    );
  }
}

export default withEmit(FlagCreator);
