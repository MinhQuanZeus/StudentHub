import React, { Component } from 'react';
import css from './ChangePhoneNumberStep1.m.scss';
import Textbox from '../../native-ui/Textbox';
import { PrimaryButton } from 'office-ui-fabric-react';
import { withFormik } from 'formik';
import { apiConstants } from '../../constants/applicationConstants';
import { object, string } from 'yup';

class ChangePhoneNumberStep1 extends Component {
  formatMobileNumber = (value) => {
    const input = value.replace(/\D/g, '').substring(0, 10);
    const zip = input.substring(0, 3);
    const middle = input.substring(3, 6);
    const last = input.substring(6, 10);
    let phoneNumber = 0;

    if (input.length > 6) {
      phoneNumber = `(${zip}) ${middle} ${last}`;
    } else if (input.length > 3) {
      phoneNumber = `(${zip}) ${middle}`;
    } else if (input.length > 0) {
      phoneNumber = `(${zip}`;
    } else {
      phoneNumber = '';
    }
    return phoneNumber;
  };

  updatePhoneNumber = (value) => {
    this.props.setFieldValue('phone', this.formatMobileNumber(value));
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
          <PrimaryButton text="Continue" type="submit" />
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
    const data = values.phone.replace(/[() ]/gi, '');
    console.log(data);
    try {
      const options = {
        method: 'Post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      };
      const response = await fetch(`${apiConstants.BACKEND_URL}student/phone/sendOtp`, options);
      const body = await response.json();
      if (body.success) {
      }
    } catch (e) {
      console.log(e);
    } finally {
      bag.setSubmitting(false);
    }
  },
})(ChangePhoneNumberStep1);
