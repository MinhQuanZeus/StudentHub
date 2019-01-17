import React from 'react';

import { forgotPasswordConstants } from '../../constants/forgotPasswordConstants';
import { applicationMessages } from '../../constants/applicationConstants';
import css from './Step1.module.scss';
import { SuccessHub, H1, H2 } from './';
export const ForgotPasswordStep3Component = props => {
  let changePasswordStatus = props.changePasswordStatus;

  let message;
  if (changePasswordStatus !== undefined && changePasswordStatus !== null) {
    switch (changePasswordStatus) {
      case forgotPasswordConstants.CHANGE_PASSWORD_SUCCESS:
        message = <div>{applicationMessages.SUCCESS}</div>;
        break;
      case forgotPasswordConstants.CHANGE_PASSWORD_PENDING:
        message = <div>{applicationMessages.PENDING}</div>;
        break;
      default:
        message = <div>{changePasswordStatus.message}</div>;
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
      <H1>Enter your New Password</H1>
      <H2>Type new password for your account</H2>
      <form noValidate="novalidate">
        <label htmlFor="npwd" style={{ marginTop: 24 }}>
          PASSWORD
        </label>
        <div className={css.Password}>
          <img src="/images/password.svg" alt="password" />
          <input
            type={props.newPasswordType}
            id="npwd"
            name="npwd"
            className="form-control"
            onChange={props.changeNewPassword}
          />
          <img
            src="/images/visibility.svg"
            alt="visibility"
            onClick={props.toggleNewPasswordVisibility}
          />
        </div>
        <label htmlFor="cpwd" style={{ marginTop: 24 }}>
          CONFIRM PASSWORD
        </label>
        <div className={css.Password}>
          <img src="/images/password.svg" alt="password" />
          <input
            type={props.conPasswordType}
            id="cpwd"
            name="cpwd"
            className="form-control"
            onChange={props.changeConPassowrd}
          />
          <img
            src="/images/visibility.svg"
            alt="visibility"
            onClick={props.toggleConPasswordVisibility}
          />
        </div>
        <button type="submit" onClick={props.submit}>
          Next
        </button>
      </form>
    </div>
  );
};
