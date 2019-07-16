import React, { Component } from 'react';
import css from './AddEmailStep1.m.scss';
import Textbox from '../../native-ui/Textbox';
import { PrimaryButton } from 'office-ui-fabric-react';
import { withFormik } from 'formik';
import { apiConstants } from '../../constants/applicationConstants';
import { object, string } from 'yup';
import { getAccessToken } from '../../helpers';

class AddEmailStep1 extends Component {
  render() {
    const { errors, handleChange, values, handleSubmit, isSubmitting } = this.props;
    return (
      <form className={css.AddEmailStep1} onSubmit={handleSubmit}>
        <Textbox label="Email Address" name="email" value={values.email} onChange={handleChange} message={errors && errors.email} />
        <div>Make sure your email active, We will send you</div>
        <div>email verification</div>
        <div>
          <PrimaryButton text="Continue" type="submit" disabled={isSubmitting} />
        </div>
      </form>
    );
  }
}

export default withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => ({
    email: props.email || '',
  }),
  validationSchema: object().shape({
    email: string()
      .required()
      .label('Email'),
  }),
  handleSubmit: async (values, bag) => {
    try {
      const options = {
        method: 'Post',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': getAccessToken(),
        },
        body: JSON.stringify(values),
      };
      const response = await fetch(`${apiConstants.BACKEND_URL}student/email/sendOtp`, options);
      const body = await response.json();
      if (body.success) {
        bag.props.onSuccess(values.email);
      }
    } catch (e) {
      console.log(e);
    } finally {
      bag.setSubmitting(false);
    }
  },
})(AddEmailStep1);
