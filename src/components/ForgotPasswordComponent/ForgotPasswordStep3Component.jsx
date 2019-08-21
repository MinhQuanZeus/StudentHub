/* eslint-disable react/prop-types */
/* global fetch */
import React, { Component } from 'react';
import { SuccessHub, H1, H2 } from './';
import { withFormik } from 'formik';
import { withEmit } from 'react-emit';

import { apiConstants } from '../../constants/applicationConstants';
import { SHOW_LOADING, HIDE_LOADING, HTTP_POST, JSON_CONTENT_TYPE } from '../../constants';
import css from './ForgotPasswordComponent.m.scss';
import { navigate } from '../../helpers';

class ForgotPasswordStep3Component extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit($event) {
    $event.preventDefault();
    const { values, emit, token } = this.props;
    emit(SHOW_LOADING);
    fetch(`${apiConstants.BACKEND_URL}${apiConstants.STUDENT_CHANGE_PASSWORD_PATH}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((json) => {
        emit(HIDE_LOADING);
        navigate('/login');
      })
      .catch((error) => {
        emit(HIDE_LOADING);
      });
    return false;
  }

  render() {
    const { props } = this;
    const { errors, handleChange } = this.props;

    return (
      <div className={css.Step1}>
        <div className="row">
          <div className="col-lg-5 col-md-6 col-sm-12">
            <SuccessHub />
            <H1>Enter your New Password</H1>
            <H2>Type new password for your account</H2>
            <form noValidate="novalidate" onSubmit={this.onSubmit}>
              <label htmlFor="password" style={{ marginTop: 24 }}>
                PASSWORD
              </label>
              <div className={css.Password}>
                <img src="/images/password.svg" alt="password" />
                <input type={props.newPasswordType} id="password" name="password" className="form-control" onChange={handleChange} />
                <img src="/images/visibility.svg" alt="visibility" onClick={props.toggleNewPasswordVisibility} />
                {errors && errors.password && (
                  <div className={css.Hint}>
                    <p>Your password must have at least:</p>
                    <ul>
                      <li>
                        <i className="fas fa-check" /> 8 characters
                      </li>
                      <li>
                        <i className="fas fa-check" /> 1 letter
                      </li>
                      <li>
                        <i className="fas fa-check" /> 1 number
                      </li>
                    </ul>
                  </div>
                )}
              </div>
              <label htmlFor="conf_password" style={{ marginTop: 24 }}>
                CONFIRM PASSWORD
              </label>
              <div className={css.Password}>
                <img src="/images/password.svg" alt="password" />
                <input
                  type={props.conPasswordType}
                  id="conf_password"
                  name="conf_password"
                  className="form-control"
                  onChange={handleChange}
                />
                <img src="/images/visibility.svg" alt="visibility" onClick={props.toggleConPasswordVisibility} />
                {errors && (!errors.password && errors.conf_password) && (
                  <div className={css.Hint}>
                    <p>Password and confirm password doesn't match</p>
                  </div>
                )}
              </div>
              <button type="submit">Next</button>
            </form>
          </div>
          <div className={`col-lg-7 col-md-6 col-sm-12 ${css.IllustrationRight}`}>
            <img src="images/forgot-password-illustration.svg" className={css.Illustration} alt="Illustration" />
          </div>
        </div>
      </div>
    );
  }
}

export default withEmit(
  withFormik({
    mapPropsToValues: (props) => ({
      token: props.token,
      password: '',
      conf_password: '',
    }),
    validate: (values) => {
      const errors = {};
      if (values.password.length < 8) {
        errors.password = 'Your password must have at least:';
      }
      const character = new RegExp('([A-Za-z]+)', 'g');
      const number = new RegExp('([0-9]+)', 'g');
      if (!character.test(values.password) || !number.test(values.password)) {
        errors.password = 'Your password must have at least:';
      }
      if (values.conf_password !== values.password) {
        errors.conf_password = 'not equal';
      }
      console.log(errors);
      return errors;
    },
    handleSubmit: async (values, bag) => {
      try {
        bag.props.emit(SHOW_LOADING);
        const data = { ...values };
        delete data.token;
        const response = await fetch(`${apiConstants.BACKEND_URL}${apiConstants.STUDENT_CHANGE_PASSWORD_PATH}`, {
          method: HTTP_POST,
          headers: {
            'Content-Type': JSON_CONTENT_TYPE,
            'x-access-token': values.token,
          },
          body: JSON.stringify(data),
        });
        const body = await response.json();
        bag.props.emit(HIDE_LOADING);
        if (body.success) {
          navigate('login');
        }
      } catch (e) {
        console.log(e);
      } finally {
        bag.props.emit(HIDE_LOADING);
        bag.setSubmitting(false);
      }
    },
  })(ForgotPasswordStep3Component)
);
