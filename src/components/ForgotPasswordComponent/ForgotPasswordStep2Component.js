import React from 'react';
import { Link } from 'react-router-dom';

import { forgotPasswordConstants } from '../../constants/forgotPasswordConstants';
import { applicationMessages } from '../../constants/applicationConstants';
import css from './Step1.module.scss';
import { SuccessHub, H1, H2 } from './';

export const ForgotPasswordStep2Component = (props) => {
  const forgotPasswordStatus = props.forgotPasswordStatus;

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
      <img src="images/forgot-password-illustration.svg" className={css.Illustration} alt="Illustration" />
      <H1>Verify your email</H1>
      <H2>Help is on the way!</H2>
      <form noValidate="novalidate">
        <label htmlFor="code" style={{ marginTop: 38 }}>
          ENTER VERIFY CODE
        </label>
        <div className={css.Email}>
          <img src="/images/username.svg" alt="mask" />
          <input type="code" id="code" name="code" className="form-control" onChange={props.changeVerifyCode} />
        </div>
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
