import React, { Component } from 'react';
import css from './ChangePhoneNumberStep2.m.scss';
import { PrimaryButton } from 'office-ui-fabric-react';
import { withFormik } from 'formik';
import { apiConstants } from '../../constants/applicationConstants';
import ReactCodeInput from 'react-code-input';

class ChangePhoneNumberStep2 extends Component {
  componentDidMount() {
    const inputs = document.getElementsByClassName('react-code-input').item(0).childNodes;
    if (inputs && inputs.length > 0) {
      inputs.forEach((item) => {
        item.setAttribute('placeholder', '0');
      });
    }
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form className={css.ChangePhoneNumberStep2} onSubmit={handleSubmit}>
        <div>Please type verification code sent</div>
        <div>to +123 456 789</div>
        <ReactCodeInput type="number" fields={6} />
        <div>Don’t Receive OTP Code</div>
        <div>
          <button className="btn btn-link">Resend OTP</button>
        </div>
        <div>
          <PrimaryButton text="Verify" type="submit" />
        </div>
      </form>
    );
  }
}

export default withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => ({
    phone_number: props.phone_number,
  }),
  handleSubmit: async (values, bag) => {
    try {
      const { user } = this.context;
      const options = {
        method: 'Post',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': user && user.x_access_token,
        },
        body: JSON.stringify(values),
      };
      const response = await fetch(`${apiConstants.BACKEND_URL}student/update_profile`, options);
      const body = await response.json();
      if (body.success) {
        bag.setStatus({ isEditing: false });
      }
    } catch (e) {
      console.log(e);
    } finally {
      bag.setSubmitting(false);
    }
  },
})(ChangePhoneNumberStep2);
