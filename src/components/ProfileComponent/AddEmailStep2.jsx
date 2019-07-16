import React, { Component } from 'react';
import css from './AddEmailStep2.m.scss';
import { PrimaryButton } from 'office-ui-fabric-react';
import { withFormik } from 'formik';
import { apiConstants } from '../../constants/applicationConstants';
import ReactCodeInput from 'react-code-input';
import { getAccessToken } from '../../helpers';
import { object, string } from 'yup';

class AddEmailStep2 extends Component {
  componentDidMount() {
    const inputs = document.getElementsByClassName('react-code-input').item(0).childNodes;
    if (inputs && inputs.length > 0) {
      inputs.forEach((item) => {
        item.setAttribute('placeholder', '0');
      });
    }
  }

  render() {
    const { errors, values, handleSubmit, setFieldValue, isSubmitting } = this.props;
    return (
      <form className={css.AddEmailStep2} onSubmit={handleSubmit}>
        <div>Please type verification code sent</div>
        <div>
          to <strong>{values.email}</strong>
        </div>
        <ReactCodeInput
          type="number"
          fields={6}
          value={values.otp}
          onChange={(value) => {
            setFieldValue('otp', value);
          }}
        />
        {errors && errors.otp && <div className={css.error}>{errors.otp}</div>}
        <div>Don’t Receive OTP Code</div>
        <div>
          <button className="btn btn-link">Resend OTP</button>
        </div>
        <div>
          <PrimaryButton text="Verify" type="submit" disabled={isSubmitting} />
        </div>
      </form>
    );
  }
}

export default withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => ({
    email: props.email,
    otp: '',
  }),
  validationSchema: object().shape({
    email: string()
      .required()
      .label('Email'),
    otp: string()
      .required()
      .length(6, 'Code has 6 number')
      .label('Code'),
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
      const response = await fetch(`${apiConstants.BACKEND_URL}student/email/verifyOtp`, options);
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
})(AddEmailStep2);
