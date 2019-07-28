import React, { Component } from 'react';
import Textbox from '../../native-ui/Textbox';
import Select from '../../native-ui/Select';
import { ADDRESS_COUNTRY_OPTIONS } from '../../constants';
import { DefaultButton, Icon, PrimaryButton } from 'office-ui-fabric-react';
import css from './AddressRegister.m.scss';
import { withFormik } from 'formik';
import { apiConstants } from '../../constants/applicationConstants';
import { getAccessToken } from '../../helpers';
import { object, string } from 'yup';

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
          <Textbox
            label="Street"
            name="street_address1"
            value={values.street_address1}
            onChange={handleChange}
            message={!isValid && errors && errors.street_address1}
          />
          <Textbox label="City" name="city" value={values.city} onChange={handleChange} message={!isValid && errors && errors.city} />
          <Textbox
            label="State/Province"
            name="spr"
            value={values.spr}
            onChange={handleChange}
            message={!isValid && errors && errors.spr}
          />
          <Textbox
            name="post_code"
            label="Zip / Postal Code"
            value={values.post_code}
            onChange={handleChange}
            message={!isValid && errors && errors.post_code}
          />
          <Select
            name="country"
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
    street_address1: '',
    city: '',
    spr: '',
    post_code: '',
    country: '',
    primary: false,
    is_staff: false,
    entity_id: props.student_id,
  }),
  validationSchema: object().shape({
    street_address1: string()
      .required()
      .label('Street'),
    city: string()
      .required()
      .label('City'),
    spr: string()
      .required()
      .label('State/Province'),
    post_code: string()
      .required()
      .label('Post code'),
    country: string()
      .required()
      .label('Country'),
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
      const response = await fetch(`${apiConstants.BACKEND_URL}student/profile/address/add`, options);
      const body = await response.json();
      if (body.success) {
        bag.props.onSuccess();
        bag.resetForm();
      }
    } catch (e) {
      console.log(e);
    } finally {
      bag.setSubmitting(false);
    }
  },
})(AddressRegister);
