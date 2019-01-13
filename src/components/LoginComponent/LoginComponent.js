import React, { Component } from 'react';
import Link from 'react-router-dom/es/Link';
import { withEmit } from 'react-emit';
import { apiConstants } from '../../constants/applicationConstants';
import { DEFAULT_FETCH_HEADERS } from '../../constants';
import {
  ACCESS_TOKEN,
  HTTP_POST,
  SHOW_LOADING,
  HIDE_LOADING
} from '../../constants';
import { getUser } from '../../helpers';
import { history } from '../../helpers/history';

class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: '',
      pwd: '',
      passwordType: 'password'
    };
    this.uid = React.createRef();
    this.pwd = React.createRef();
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    if (getUser()) {
      history.push({ pathname: '/my-profile' });
    }
  }

  onSubmit($event) {
    $event.preventDefault();
    this.props.emit(SHOW_LOADING);
    const uid = this.uid && this.uid.current && this.uid.current.value;
    const pwd = this.pwd && this.pwd.current && this.pwd.current.value;
    fetch(apiConstants.BACKEND_URL + apiConstants.STUDENT_LOGIN_PATH, {
      method: HTTP_POST,
      body: JSON.stringify({
        email: uid,
        password: pwd
      }),
      headers: DEFAULT_FETCH_HEADERS
    })
      .then(response => response.json())
      .then(json => {
        localStorage.setItem(
          ACCESS_TOKEN,
          json.data && json.data.x_access_token
        );
        this.props.emit(HIDE_LOADING);
        history.push({
          pathname: '/my-profile'
        });
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
    return (
      <div className="container" onSubmit={this.props.submit}>
        <div className="login-form-container">
          <div className="inner-form-container">
            <div className="success-hub-title">
              <img src="images/shape.svg" className="Shape" alt="" />
              <span className="success-brand">Success</span>
              <span className="hub-brand">Hub</span>
            </div>
            <div className="login-form">
              <form id="form_login" noValidate="novalidate">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item border-0">
                    <h2 className="card-title m-0">Welcome back!</h2>
                  </li>
                  <li className="list-group-item border-0">
                    <div className="form-group">
                      <label htmlFor="login_username">Username</label>
                      <div className="input-group">
                        <span className="input-group-addon">
                          <i className="fa fa-user fa-2x" />
                        </span>
                        <input
                          ref={this.uid}
                          type="email"
                          id="login_username"
                          name="uid"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="login_password">Password</label>
                      <div className="input-group">
                        <span className="input-group-addon">
                          <i className="fa fa-key fa-2x" />
                        </span>
                        <input
                          ref={this.pwd}
                          type={this.state.passwordType}
                          id="login_password"
                          name="pwd"
                          className="form-control"
                        />
                        <span
                          className="input-group-addon"
                          onClick={this.togglePasswordVisibility}
                        >
                          <i
                            className="fa fa-eye"
                            style={{ fontSize: '23px' }}
                          />
                        </span>
                      </div>
                    </div>
                    <label className="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        id="login_remember"
                        className="custom-control-input"
                      />
                      <span className="custom-control-indicator" />
                      <span className="custom-control-description">
                        Keep me logged in
                      </span>
                    </label>
                  </li>
                  {/* <li className="list-group-item border-0">{loginMessage}</li> */}
                  <li className="list-group-item border-0">
                    <button
                      type="submit"
                      className="btn btn-primary login-btn"
                      onClick={this.onSubmit}
                    >
                      Login
                    </button>
                  </li>
                </ul>
              </form>
              <div>
                <Link to="/forgot-password?step=1">
                  <p className="forgot-password-paragraph">Forgot Password ?</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="login-image-container">
          <img
            src="images/login-illustration.svg"
            className="Illustration"
            alt=""
          />
        </div>
      </div>
    );
  }
}

export default withEmit(LoginComponent);
