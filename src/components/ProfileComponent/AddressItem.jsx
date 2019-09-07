/* global fetch */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { withFormik } from 'formik';
import { apiConstants } from '../../constants/applicationConstants';
import css from './AddressItem.m.scss';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react';
import Textbox from '../../native-ui/Textbox';
import { ADDRESS_COUNTRY_OPTIONS } from '../../constants';
import Select from '../../native-ui/Select';
import { object, string } from 'yup';
import { getAccessToken } from '../../helpers';

class AddressItem extends Component {
  onCancel = () => {
    const { props } = this;
    this.props.setValues({
      entity_id: props.staffId,
      address_id: props.address_id,
      is_staff: true,
      street_address1: props.street_address1,
      street_address2: props.street_address2,
      city: props.city,
      spr: props.spr,
      post_code: props.post_code,
      country: props.country,
      address_type: props.address_type,
      campus_housing: props.campus_housing,
      active: props.active,
      primary: props.primary,
    });
    this.props.setStatus({ isEditing: false });
  };

  getViewMode = () => {
    const { street_address1, country, city, post_code } = this.props;
    const { isEditing } = this.props.status;
    return (
      <div className={css.ViewMode}>
        <p>
          {street_address1}, {city} <br />
          {country}, {post_code}
        </p>
        {!isEditing && (
          <button className={css.BtnEdit} onClick={() => this.props.setStatus({ isEditing: true })}>
            Edit Address
          </button>
        )}
      </div>
    );
  };

  getEditMode = () => {
    const { values, handleChange, handleSubmit, errors, setFieldValue, isValid } = this.props;
    return (
      <form onSubmit={handleSubmit} noValidate>
        <Textbox
          label="Street"
          name="street_address1"
          value={values.street_address1}
          onChange={handleChange}
          message={!isValid && errors && errors.street_address1}
        />
        <Textbox label="City" name="city" value={values.city} onChange={handleChange} message={!isValid && errors && errors.city} />
        <Textbox label="State/Province" name="spr" value={values.spr} onChange={handleChange} message={!isValid && errors && errors.spr} />
        <Textbox
          name="post_code"
          label="Zip / Postal Code"
          value={values.post_code}
          onChange={handleChange}
          message={!isValid && errors && errors.post_code}
        />
        <Select
          label="Country"
          name="country"
          options={ADDRESS_COUNTRY_OPTIONS}
          value={values.country}
          placeholder="Please select a country"
          onItemSelected={(value) => setFieldValue('country', value)}
          message={!isValid && !errors && errors.country}
        />
        <div>
          <DefaultButton text="Cancel" onClick={this.onCancel} />
          <PrimaryButton text="Save" type="submit" />
        </div>
      </form>
    );
  };

  render() {
    const { isEditing } = this.props.status;
    const { currentAddress, values, onSetCurrentAddress, viewMode } = this.props;
    return (
      <div className={css.AddressItem}>
        <div>
          <label className={css.radio} onClick={() => onSetCurrentAddress(values)}>
            <input checked={currentAddress.address_id === values.address_id} type="radio" onChange={() => {}} value={1} />
            <span className={css.checkround} />
          </label>
        </div>
        {viewMode === 'MOBILE' && this.getViewMode()}
        {(viewMode === 'DESKTOP') && (!isEditing ? this.getViewMode() : this.getEditMode())}
      </div>
    );
  }
}

export default withFormik({
  enableReinitialize: true,
  mapPropsToStatus: () => ({
    isEditing: false,
  }),
  mapPropsToValues: (props) => ({
    address_id: props.address_id,
    street_address1: props.street_address1,
    city: props.city,
    spr: props.spr,
    post_code: props.post_code,
    country: props.country,
    entity_id: props.student_id,
    is_staff: false,
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
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': getAccessToken(),
        },
        body: JSON.stringify(values),
      };
      const response = await fetch(`${apiConstants.BACKEND_URL}student/profile/address/update`, options);
      const body = await response.json();
      if (body.success) {
        bag.setStatus({ isEditing: false });
        bag.props.onSuccess();
      }
    } catch (e) {
      console.log(e);
    } finally {
      bag.setSubmitting(false);
    }
  },
})(AddressItem);
