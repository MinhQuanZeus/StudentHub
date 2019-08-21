/* eslint-disable react/prop-types */
/* global window, fetch, localStorage */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withEmit } from 'react-emit';
import { API_CODE_SUCCESS, apiConstants } from '../../constants/applicationConstants';
import { ACCESS_TOKEN, HIDE_LOADING, HTTP_POST, JSON_CONTENT_TYPE, SHOW_LOADING } from '../../constants';
import { getUser, navigate } from '../../helpers';
import css from './LoginComponent.m.scss';
import './checkbox.scss';
import { withFormik } from 'formik';

class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passwordType: 'password',
    };
    if (window.screen.width >= 1200) {
      this.illustration = '/images/illustration.svg';
    } else {
      this.illustration = '/images/illustration_tablet.svg';
    }
  }

  componentWillMount() {
    if (getUser()) {
      navigate('/my-profile', { replace: true });
    }
  }

  togglePasswordVisibility = () => {
    this.setState((prevState) => {
      if (prevState.passwordType === 'password') {
        return { passwordType: 'text' };
      }

      return { passwordType: 'password' };
    });
  };

  render() {
    const { handleChange, handleSubmit, isSubmitting } = this.props;
    const { statusMessage } = this.props.status;
    return (
      <div className={css.Login} onSubmit={this.props.submit}>
        <div className="row">
          <div className="col-lg-5 col-md-5 col-sm-12">
            <img className={css.SuccessHub} src="/images/success-hub-logo.svg" alt="SuccessHub" />
            <h2 className={css.WelcomeBack}>Welcome Back!</h2>
            <div className={css.IllustrationTop}>
              <img src={this.illustration} className={css.Illustration} alt="Illustration" />
            </div>
            <form onSubmit={handleSubmit} noValidate="novalidate">
              <label htmlFor="email" style={{ marginTop: 38 }}>
                username
              </label>
              <div className={css.Email}>
                <img src="/images/username.svg" alt="mask" />
                <input type="email" id="email" name="email" className="form-control" onChange={handleChange} />
              </div>
              <label htmlFor="password" style={{ marginTop: 24 }}>
                password
              </label>
              <div className={css.Password}>
                <img src="/images/password.svg" alt="password" />
                <input type={this.state.passwordType} id="password" name="password" className="form-control" onChange={handleChange} />
                <img src="/images/visibility.svg" alt="visibility" onClick={this.togglePasswordVisibility} />
              </div>
              {!isSubmitting && statusMessage ? <div className={css.error}>{{ statusMessage }}</div> : null}
              <div className={css.Remember}>
                <input className="checkbox" id="remember" type="checkbox" />
                <label htmlFor="remember">
                  <span>Keep me logged in</span>
                </label>
              </div>
              <button type="submit">Login</button>
            </form>
            <div className={css.ForgotPassword}>
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>
          </div>
          <div className={`col-lg-7 col-md-7 col-sm-12 ${css.IllustrationRight}`}>
            <img src={this.illustration} className={css.Illustration} alt="Illustration" />
          </div>
        </div>
      </div>
    );
  }
}

export default withEmit(
  withFormik({
    mapPropsToStatus: () => ({
      statusMessage: '',
    }),
    mapPropsToValues: () => ({
      email: '',
      password: '',
    }),
    handleSubmit: async (values, bag) => {
      try {
        bag.props.emit(SHOW_LOADING);
        const response = await fetch(`${apiConstants.BACKEND_URL}${apiConstants.STUDENT_LOGIN_PATH}`, {
          method: HTTP_POST,
          headers: {
            'Content-Type': JSON_CONTENT_TYPE,
          },
          body: JSON.stringify(values),
        });
        const body = await response.json();
        if (body.code === API_CODE_SUCCESS) {
          localStorage.setItem(ACCESS_TOKEN, body.data && body.data.x_access_token);
          navigate('/my-profile', { replace: true });
        }
      } catch (e) {
        console.log(e);
      } finally {
        bag.props.emit(HIDE_LOADING);
        bag.setSubmitting(false);
      }
    },
  })(LoginComponent)
);
