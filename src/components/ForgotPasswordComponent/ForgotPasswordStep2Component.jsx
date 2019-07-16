import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { forgotPasswordConstants } from '../../constants/forgotPasswordConstants';
import { apiConstants } from '../../constants/applicationConstants';
import css from './ForgotPasswordComponent.m.scss';
import { SuccessHub, H1, H2 } from './';
import { withEmit } from 'react-emit';
import { withFormik } from 'formik';
import { HIDE_LOADING, HTTP_POST, JSON_CONTENT_TYPE, SHOW_LOADING } from '../../constants';
import { object, string } from 'yup';

class ForgotPasswordStep2Component extends Component {
  render() {
    const { handleChange, handleSubmit, values, errors } = this.props;
    return (
      <div className={css.Step1}>
        <div className="row">
          <div className="col-lg-5 col-5 col-md-6 col-sm-6">
            <SuccessHub />
            <H1>Verify your email</H1>
            <H2>Help is on the way!</H2>
            <form noValidate="novalidate">
              <label htmlFor="otp" style={{ marginTop: 38 }}>
                ENTER VERIFY CODE
              </label>
              <div className={css.Email}>
                <img src="/images/username.svg" alt="mask" />
                <input type="code" id="otp" name="otp" value={values.otp} className="form-control" onChange={handleChange} />
              </div>
              {errors && errors.otp && <div className={css.error}>{errors.otp}</div>}
              <button type="submit" onClick={handleSubmit}>
                Next
              </button>
              <div className={css.Login}>
                <p>
                  Remember your password? <Link to="/login">Login here</Link>
                </p>
              </div>
            </form>
          </div>
          <div className="col-lg-7 col-7 col-md-6 col-sm-6">
            <img src="images/forgot-password-illustration.svg" alt="Illustration" />
          </div>
        </div>
      </div>
    );
  }
}

export default withEmit(
  withFormik({
    mapPropsToValues: (props) => ({
      email: props.email,
      otp: '',
    }),
    validationSchema: object().shape({
      otp: string()
        .required()
        .label('Code'),
    }),
    handleSubmit: async (values, bag) => {
      try {
        bag.props.emit(SHOW_LOADING);
        const data = {
          email: values.email,
          channel: forgotPasswordConstants.EMAIL_CHANNEL,
          otp: values.otp,
        };
        const response = await fetch(`${apiConstants.BACKEND_URL}${apiConstants.STUDENT_FORGOT_PASSWORD_PATH}`, {
          method: HTTP_POST,
          headers: {
            'Content-Type': JSON_CONTENT_TYPE,
          },
          body: JSON.stringify(data),
        });
        const body = await response.json();
        bag.props.emit(HIDE_LOADING);
        if (body.success) {
          const token = body.data && body.data.x_access_token;
          bag.props.setToken(token);
          bag.props.onNextStep(3, values.email);
        }
      } catch (e) {
        console.log(e);
      } finally {
        bag.props.emit(HIDE_LOADING);
        bag.setSubmitting(false);
      }
    },
  })(ForgotPasswordStep2Component)
);
