import React, { Component } from 'react';
import { Link } from '@reach/router';
import { withEmit } from 'react-emit';
import { apiConstants } from '../../constants/applicationConstants';
import { JSON_CONTENT_TYPE } from '../../constants';
import {
  ACCESS_TOKEN,
  HTTP_POST,
  SHOW_LOADING,
  HIDE_LOADING
} from '../../constants';
import { getUser } from '../../helpers';
import { navigate } from '@reach/router';
import css from './Login.module.scss';
import './checkbox.scss';
import { withFormik } from 'formik';

class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passwordType: 'password'
    };
    this.onSubmit = this.onSubmit.bind(this);
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

  onSubmit($event) {
    $event.preventDefault();
    this.props.emit(SHOW_LOADING);
    fetch(apiConstants.BACKEND_URL + apiConstants.STUDENT_LOGIN_PATH, {
      method: HTTP_POST,
      body: JSON.stringify(this.props.values),
      headers: {
        'Content-Type': JSON_CONTENT_TYPE
      }
    })
      .then(response => response.json())
      .then(json => {
        localStorage.setItem(
          ACCESS_TOKEN,
          json.data && json.data.x_access_token
        );
        this.props.emit(HIDE_LOADING);
        navigate('/my-profile', { replace: true });
      });
  }

  togglePasswordVisibility = () => {
    this.setState(prevState => {
      if (prevState.passwordType === 'password') {
        return { passwordType: 'text' };
      }

      return { passwordType: 'password' };
    });
  };

  render() {
    const { handleChange } = this.props;

    return (
      <div className={css.Login} onSubmit={this.props.submit}>
        <img
          className={css.SuccessHub}
          src="/images/success-hub-logo.svg"
          alt="SuccessHub"
        />
        <img
          src={this.illustration}
          className={css.Illustration}
          alt="Illustration"
        />
        <h2 className={css.WelcomeBack}>Welcome Back!</h2>
        <form noValidate="novalidate">
          <label htmlFor="email" style={{ marginTop: 38 }}>
            username
          </label>
          <div className={css.Email}>
            <img src="/images/username.svg" alt="mask" />
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              onChange={handleChange}
            />
          </div>
          <label htmlFor="password" style={{ marginTop: 24 }}>
            password
          </label>
          <div className={css.Password}>
            <img src="/images/password.svg" alt="password" />
            <input
              type={this.state.passwordType}
              id="password"
              name="password"
              className="form-control"
              onChange={handleChange}
            />
            <img
              src="/images/visibility.svg"
              alt="visibility"
              onClick={this.togglePasswordVisibility}
            />
          </div>
          <div className={css.Remember}>
            <input className="checkbox" id="remember" type="checkbox" />
            <label htmlFor="remember">Keep me logged in</label>
          </div>
          <button type="submit" onClick={this.onSubmit}>
            Login
          </button>
        </form>

        <div className={css.ForgotPassword}>
          <Link to="/forgot-password?step=1">Forgot Password?</Link>
        </div>
      </div>
    );
  }
}

export default withFormik({
  mapPropsToValues: () => ({
    email: '',
    password: ''
  })
})(withEmit(LoginComponent));
