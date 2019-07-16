import React, { Component } from 'react';
import Textbox from '../../native-ui/Textbox';
import Select from '../../native-ui/Select';
import { ADDRESS_COUNTRY_OPTIONS } from '../../constants';
import { DefaultButton, Icon, PrimaryButton } from 'office-ui-fabric-react';
import css from './AddressRegister.m.scss';
import { withFormik } from 'formik';
import { apiConstants } from '../../constants/applicationConstants';

class AddressRegister extends Component {
  render() {
    const { values, handleChange, handleSubmit, errors, setFieldValue, isValid } = this.props;

    return (
      <div className={css.AddressRegister}>
        <div>
          <Icon iconName="CalculatorAddition" />
          &ensp;&ensp;<span>Add New Address</span>
        </div>
        <form onSubmit={handleSubmit} noValidate>
          <Textbox label="Street" value={values.street} onChange={handleChange} message={isValid && errors && errors.street} />
          <Textbox label="City" value={values.city} onChange={handleChange} message={isValid && errors && errors.city} />
          <Textbox label="State/Province" value={values.spr} onChange={handleChange} message={isValid && errors && errors.spr} />
          <Textbox
            label="Zip / Postal Code"
            value={values.post_code}
            onChange={handleChange}
            message={isValid && errors && errors.post_code}
          />
          <Select
            label="Country"
            options={ADDRESS_COUNTRY_OPTIONS}
            value={values.country}
            placeholder="Please select a country"
            onItemSelected={(value) => setFieldValue('country', value)}
            message={!isValid && !errors && errors.country}
          />
          <div>
            <DefaultButton text="Cancel" onClick={() => this.props.onCancel()} />
            <PrimaryButton text="Create New Address" type="submit" />
          </div>
        </form>
      </div>
    );
  }
}

export default withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => ({
    street: props.street,
    city: props.city,
    spr: props.spr,
    post_code: props.post_code,
    country: props.country,
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
})(AddressRegister);
