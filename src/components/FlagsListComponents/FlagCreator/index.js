/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Popup } from '../Popup';
import { Stepper, Step } from '../Stepper';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import css from './FlagCreator.module.scss';
import { API_END_POINT, GET_FLAG_CATEGORIES, GET_STAFFS, GET_STUDENTS, CREATE_NEW_FLAG } from '../../../constants/ApiUrl';
import { HTTP_GET, SHOW_LOADING, HIDE_LOADING, HTTP_POST, JSON_CONTENT_TYPE } from '../../../constants';
import { withEmit } from 'react-emit';
import { AppContext } from '../../../containers/AppContext';

class FlagCreator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      current: 1,
      error: null,
    };

    this.data = {};

    this.mounted = false;
    this.previous = this.previous.bind(this);
    this.next = this.next.bind(this);
    this.onReponse = this.onReponse.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.onError = this.onError.bind(this);
    props.emit(SHOW_LOADING);

    Promise.all([
      fetch(`${API_END_POINT}${GET_FLAG_CATEGORIES}`, {
        method: HTTP_GET,
        headers: {
          'Content-Type': JSON_CONTENT_TYPE,
          'X-Access-Token': this.props.context.accessToken,
        },
      }).then((response) => response.json()),
      fetch(`${API_END_POINT}${GET_STAFFS}`, {
        method: HTTP_GET,
        headers: {
          'Content-Type': JSON_CONTENT_TYPE,
          'X-Access-Token': this.props.context.accessToken,
        },
      }).then((response) => response.json()),
      fetch(`${API_END_POINT}${GET_STUDENTS}`, {
        method: HTTP_GET,
        headers: {
          'Content-Type': JSON_CONTENT_TYPE,
          'X-Access-Token': this.props.context.accessToken,
        },
      }).then((response) => response.json()),
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
    this.setState((state) => ({
      categories:
        $jsons[0].data &&
        $jsons[0].data.map((obj) => {
          const subs = obj.subs.map((sub) => ({
            id: sub.id,
            name: sub.category_name,
            parrentId: sub.parrent,
          }));
          return { id: obj.id, name: obj.category_name, subs: subs };
        }),
      staffs: $jsons[1].data,
      students: $jsons[2].data,
    }));
  }

  previous(values) {
    this.data = Object.assign(this.data, values);
    this.setState((state) => ({
      current: state.current > 1 ? state.current - 1 : 1,
    }));
  }

  showError = (message, step = this.state.current, millisecond = 4000) => {
    this.setState({ error: message, current: step });
    setTimeout(() => {
      this.setState({ error: null });
    }, millisecond);
  };

  validateFlagData(data) {
    if (data.subject === '') {
      this.showError('Topic is not allowed to be empty', 1, 4000);
      return false;
    } else if (data.category === '') {
      this.showError('Category is not allowed to be empty', 1, 4000);
      return false;
    } else if (data.description === '') {
      this.showError('Description is not allowed to be empty', 2, 4000);
      return false;
      // } else if (!data.assign_id || data.assign_id === '') {
      // this.showError('Assign is not allowed to be empty', 3, 4000);
      // return false;
    } else {
      this.setState({ error: null });
      return true;
    }
  }

  next(values) {
    this.data = Object.assign(this.data, values);
    if (values.is_public) {
      this.data = Object.assign(this.data, { is_public: parseInt(values.is_public) });
    }

    if (this.state.current === 4) {
      if (this.validateFlagData(this.data)) {
        this.props.emit(SHOW_LOADING);
        fetch(`${API_END_POINT}${CREATE_NEW_FLAG}`, {
          method: HTTP_POST,
          body: JSON.stringify(this.data),
          headers: {
            'Content-Type': JSON_CONTENT_TYPE,
            'X-Access-Token': this.context.accessToken,
          },
        })
          .then((response) => response.json())
          .then((response) => {
            if (response.code === 422 || response.code === '422') {
              this.onError(response);
            } else {
              this.onSuccess(response);
            }
          })
          .catch(this.onError);
      }
    } else {
      this.setState((state) => ({
        current: state.current < 4 ? state.current + 1 : 4,
      }));
    }
  }

  handleApiError($json) {
    if ($json && $json.data[0]) {
      let message = $json.data[0].message || '';
      message = message.replace(/["]/gi, '');
      message = message.charAt(0).toUpperCase() + message.slice(1);
      this.showError(message, this.state.current, 4000);
    } else if ($json && $json.data) {
      this.showError($json.data, this.state.current, 4000);
    } else {
      this.showError(`Sorry, something's wrong. Please try again.`, this.state.current, 4000);
    }
  }

  onSuccess($json) {
    this.props.emit(HIDE_LOADING);
    this.props.onSuccessCreator();
  }

  onError($json) {
    this.props.emit(HIDE_LOADING);
    this.handleApiError($json);
  }

  onPupopDismiss = ($event) => {
    this.setState({ current: 1 });
    this.props.onDismiss($event);
  }

  render() {
    const { props, state } = this;

    return (
      <Popup title="Create New Flag" isOpen={props.isOpen} className={css.FlagCreator} onDismiss={this.onPupopDismiss}>
        <Stepper className={css.Stepper} current={state.current}>
          <Step index={1} title="Info" className={css.Step1} current={this.state.current} />
          <Step index={2} title="Details" className={css.Step2} current={this.state.current} />
          <Step index={3} title="Assign" className={css.Step3} current={this.state.current} />
          <Step index={4} title="Receiver" className={css.Step4} current={this.state.current} />
        </Stepper>
        <div className={css.Body}>
          <Step1 current={state.current} categories={state.categories} onNext={this.next} error={state.error} />
          <Step2 current={state.current} onNext={this.next} onPrevious={this.previous} error={state.error} />
          <Step3 current={state.current} staffs={state.staffs} onPrevious={this.previous} onNext={this.next} error={state.error} />
          <Step4 current={state.current} students={state.students} onNext={this.next} onPrevious={this.previous} error={state.error} />
        </div>
      </Popup>
    );
  }
}

FlagCreator.contextType = AppContext;

export default withEmit(FlagCreator);
