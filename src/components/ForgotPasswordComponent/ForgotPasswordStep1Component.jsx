import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { forgotPasswordConstants } from '../../constants/forgotPasswordConstants';
import { apiConstants } from '../../constants/applicationConstants';
import { H1, H2, SuccessHub } from './';
import css from './ForgotPasswordComponent.m.scss';
import { withEmit } from 'react-emit';
import { withFormik } from 'formik';
import { HIDE_LOADING, HTTP_POST, JSON_CONTENT_TYPE, SHOW_LOADING } from '../../constants';
import { object, string } from 'yup';

class ForgotPasswordStep1Component extends Component {
  render() {
    const { handleChange, handleSubmit, values, errors } = this.props;

    // let message;
    // if (forgotPasswordStatus !== undefined && forgotPasswordStatus !== null) {
    //   switch (forgotPasswordStatus) {
    //     case forgotPasswordConstants.FORGOT_PASSWORD_SUCCESS:
    //       message = <div>{applicationMessages.SUCCESS}</div>;
    //       break;
    //     case forgotPasswordConstants.FORGOT_PASSWORD_PENDING:
    //       message = <div>{applicationMessages.PENDING}</div>;
    //       break;
    //     default:
    //       message = <div>{forgotPasswordStatus.message}</div>;
    //   }
    // }

    return (
      <div className={css.Step1}>
        <div className="row">
          <div className="col-lg-5 col-md-6 col-sm-12">
            <SuccessHub />
            <div className={css.IllustrationTop}>
              <img src="images/forgot-password-illustration.svg" className={css.Illustration} alt="Illustration" />
            </div>
            <H1>Forgot your password?</H1>
            <H2>Don't worry! We will help you reset your password</H2>

            <form noValidate="novalidate">
              <label htmlFor="email" style={{ marginTop: 38 }}>
                username
              </label>
              <div className={css.Email}>
                <img src="/images/username.svg" alt="mask" />
                <input type="email" id="email" name="email" value={values.email} className="form-control" onChange={handleChange} />
              </div>
              {errors && errors.email && <div className={css.error}>{errors.email}</div>}
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
    mapPropsToValues: () => ({
      email: '',
    }),
    validationSchema: object().shape({
      email: string()
        .required()
        .label('Email'),
    }),
    handleSubmit: async (values, bag) => {
      try {
        bag.props.emit(SHOW_LOADING);
        const data = {
          email: values.email,
          channel: forgotPasswordConstants.EMAIL_CHANNEL,
          otp: '',
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
          bag.props.onNextStep(2, values.email);
        }
      } catch (e) {
        console.log(e);
      } finally {
        bag.props.emit(HIDE_LOADING);
        bag.setSubmitting(false);
      }
    },
  })(ForgotPasswordStep1Component)
);
