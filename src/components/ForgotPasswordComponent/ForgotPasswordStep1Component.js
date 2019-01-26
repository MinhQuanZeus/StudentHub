import React from 'react';
import { Link } from '@reach/router';

import { forgotPasswordConstants } from '../../constants/forgotPasswordConstants';
import { applicationMessages } from '../../constants/applicationConstants';
import { SuccessHub, H1, H2 } from './';
import css from './Step1.module.scss';

export const ForgotPasswordStep1Component = props => {
  let forgotPasswordStatus = props.forgotPasswordStatus;

  let message;
  if (forgotPasswordStatus !== undefined && forgotPasswordStatus !== null) {
    switch (forgotPasswordStatus) {
      case forgotPasswordConstants.FORGOT_PASSWORD_SUCCESS:
        message = <div>{applicationMessages.SUCCESS}</div>;
        break;
      case forgotPasswordConstants.FORGOT_PASSWORD_PENDING:
        message = <div>{applicationMessages.PENDING}</div>;
        break;
      default:
        message = <div>{forgotPasswordStatus.message}</div>;
    }
  }

  return (
    <div className={css.Step1}>
      <SuccessHub />
      <img
        src="images/forgot-password-illustration.svg"
        className={css.Illustration}
        alt="Illustration"
      />
      <H1>Forgot your password?</H1>
      <H2>Don't worry! We will help you reset your password</H2>

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
            onChange={props.changeEmail}
          />
        </div>
        {message}
        <button type="submit" onClick={props.submit}>
          Next
        </button>
        <div className={css.Login}>
          <p>
            Remember your password? <Link to="/login">Login here</Link>
          </p>
        </div>
      </form>
    </div>
  );
};
