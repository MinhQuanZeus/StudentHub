/* eslint-disable react/prop-types */
/* global fetch */
import React, { Component } from 'react';
import css from './ChangePhoneNumberStep1.m.scss';
import Textbox from '../../native-ui/Textbox';
import { PrimaryButton } from 'office-ui-fabric-react';
import { withFormik } from 'formik';
import { apiConstants } from '../../constants/applicationConstants';
import { object, string } from 'yup';
import { getAccessToken, formatPhoneNumberNtl, formatPhoneNumberIntl } from '../../helpers';

class ChangePhoneNumberStep1 extends Component {
  updatePhoneNumber = (value) => {
    this.props.setFieldValue('phone', formatPhoneNumberNtl(value));
  };

  render() {
    const { errors, values, handleSubmit } = this.props;
    return (
      <form className={css.ChangePhoneNumberStep1} onSubmit={handleSubmit}>
        <Textbox
          label="Phone Number"
          value={values.phone}
          onChange={(event) => this.updatePhoneNumber(event.target.value)}
          message={errors && errors.phone}
        />
        <div>We will send you one time sms verification</div>
        <div>Messages & Data rates may apply</div>
        <div>
          <PrimaryButton text="Continue" type="submit"/>
        </div>
      </form>
    );
  }
}

export default withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => ({
    phone: props.phone,
  }),
  validationSchema: object().shape({
    phone: string()
      .required()
      .label('Phone Number'),
  }),
  handleSubmit: async (values, bag) => {
    const data = formatPhoneNumberIntl(values.phone);
    try {
      const options = {
        method: 'Post',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': getAccessToken(),
        },
        body: JSON.stringify({ phone: data }),
      };
      const response = await fetch(`${apiConstants.BACKEND_URL}student/phone/sendOtp`, options);
      const body = await response.json();
      if (body.success) {
        bag.props.onSuccess(data);
      } else {
        bag.setErrors({ phone: body.data });
      }
    } catch (e) {
      console.log(e);
    } finally {
      bag.setSubmitting(false);
    }
  },
})(ChangePhoneNumberStep1);
