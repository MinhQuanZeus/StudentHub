/* global fetch */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import css from './BasicContact.m.scss';
import { DefaultButton, Icon, PrimaryButton } from 'office-ui-fabric-react';
import { apiConstants } from '../../constants/applicationConstants';
import { withFormik } from 'formik';
import ChangePhoneNumberModal from './ChangePhoneNumberModal';
import AddEmailModal from './AddEmailModal';
import { formatPhoneNumberNtl } from '../../helpers';

class BasicContact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenChangePhone: false,
      isOpenAddEmail: false,
    };
  }

  onCancelChangePhone = () => {
    this.setState({ isOpenChangePhone: false });
  };

  onCancelAddEmail = () => {
    this.setState({ isOpenAddEmail: false });
  };

  onCancel = () => {
    this.props.setStatus({ isEditing: false });
    this.initStateValue(this.props);
  };

  initStateValue = (props) => {
    this.props.setValues({
      photo_url: props.photo_url,
      salutation: props.salutation,
      first_name: props.first_name,
      last_name: props.last_name,
      middle_name: props.middle_name,
      other_name: props.other_name,
      birthdate: props.birthdate,
      gender: props.gender,
      ethnicity: props.ethnicity,
      social_security_number: props.social_security_number,
      last_4_digits_of_ssn: props.last_4_digits_of_ssn,
      international_student: props.international_student,
      type_indicator_image: props.type_indicator_image,
      home_phone: props.home_phone,
      mobile_phone: props.mobile_phone,
      work_phone: props.work_phone,
      primary_email: props.primary_email,
      secondary_email: props.secondary_email,
      preferred_contact_method: props.preferred_contact_method,
      enrollment_status: props.enrollment_status,
      highest_degree_earned: props.highest_degree_earned,
      class_team_or_cohort: props.class_team_or_cohort,
      status: props.status,
      student_id: props.student_id,
      record_id: props.record_id,
      verification_token: props.verification_token,
      age_125: props.age_125,
      enrollment_level: props.enrollment_level,
      student_height_127: props.student_height_127,
      city_127: props.city_127,
      facebook: props.facebook,
      twitter: props.twitter,
      instangram: props.instangram,
      linkedin: props.linkedin,
      snapchat: props.snapchat,
      skype: props.skype,
      classification: props.classification,
      highest_level_of_education_completed: props.highest_level_of_education_completed,
      total_credits_hoursoveral_gpa: props.total_credits_hoursoveral_gpa,
      overal_gpa: props.overal_gpa,
      primary_campus: props.primary_campus,
      country_of_citizenship: props.country_of_citizenship,
      country_of_residence: props.country_of_residence,
      state_province_of_residency: props.state_province_of_residency,
      total_credits_hours: props.total_credits_hours,
      passport_number: props.passport_number,
      passport_expiration_date: props.passport_expiration_date,
      visa_number: props.visa_number,
      visa_issued_date: props.visa_issued_date,
      visa_issued_country: props.visa_issued_country,
      visa_expiration_date: props.visa_expiration_date,
    });
  };

  getViewMode = () => {
    const { values } = this.props;
    return (
      <div>
        <table className="table">
          <tbody>
            <tr>
              <td>Phone Number</td>
              <td>{formatPhoneNumberNtl(values.mobile_phone)}</td>
            </tr>
            <tr>
              <td>Email Address</td>
              <td>{values.primary_email}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  getEditMode = () => {
    const { values, handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <table className="table">
          <tbody>
            <tr>
              <td>
                Phone Number&ensp;
                <span onClick={() => this.setState({ isOpenChangePhone: true })} className={css.PrimaryHint}>
                  (Change Phone Number)
                </span>
              </td>
              <td>{formatPhoneNumberNtl(values.mobile_phone)}</td>
            </tr>
            <tr>
              <td>Email Address</td>
              <td className={css.PrimaryHint}>{values.primary_email}</td>
            </tr>
            <tr>
              <td>
                Other Email List
                <p className={css.TextHint}>(choose one to set the preferred email address)</p>
              </td>
              <td />
            </tr>
            <tr>
              <td colSpan={2}>
                <div className={css.AddNewAddress} onClick={() => this.setState({ isOpenAddEmail: true })}>
                  <Icon iconName="CalculatorAddition" />
                  &ensp;&ensp;Add New Email Address
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div>
          <DefaultButton text="Cancel" onClick={this.onCancel} />
          <PrimaryButton text="Save" type="submit" />
        </div>
      </form>
    );
  };

  render() {
    const { setStatus, onSuccess, viewMode } = this.props;
    const { isEditing } = this.props.status;
    const { isOpenChangePhone, isOpenAddEmail } = this.state;
    return (
      <div className={css.BasicContact}>
        <div>BASIC CONTACT</div>
        {!isEditing && (
          <div className={css.EditButton} onClick={() => setStatus({ isEditing: true })}>
            <Icon iconName="EditSolid12" />
            {'  '}
            Edit
          </div>
        )}
        <div className="card">
          <div className="card-body">
            {viewMode === 'MOBILE' && this.getViewMode()}
            {viewMode === 'DESKTOP' && (!isEditing ? this.getViewMode() : this.getEditMode())}
          </div>
        </div>
        <ChangePhoneNumberModal
          isOpen={isOpenChangePhone}
          onCancel={this.onCancelChangePhone}
          onSuccess={() => {
            onSuccess();
            this.setState({ isOpenChangePhone: false });
          }}
        />
        <AddEmailModal isOpen={isOpenAddEmail} onCancel={this.onCancelAddEmail} onSuccess={onSuccess} />
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
    photo_url: props.photo_url,
    salutation: '',
    first_name: props.first_name,
    last_name: props.last_name,
    middle_name: props.middle_name,
    other_name: props.other_name,
    birthdate: props.birthdate,
    gender: props.gender,
    ethnicity: props.ethnicity,
    social_security_number: props.social_security_number,
    last_4_digits_of_ssn: props.last_4_digits_of_ssn,
    international_student: props.international_student,
    type_indicator_image: props.type_indicator_image,
    home_phone: props.home_phone,
    mobile_phone: props.mobile_phone,
    work_phone: props.work_phone,
    primary_email: props.primary_email,
    secondary_email: props.secondary_email,
    preferred_contact_method: props.preferred_contact_method,
    enrollment_status: props.enrollment_status,
    highest_degree_earned: props.highest_degree_earned,
    class_team_or_cohort: props.class_team_or_cohort,
    status: props.status,
    student_id: props.student_id,
    record_id: props.record_id,
    verification_token: props.verification_token,
    age_125: props.age_125,
    enrollment_level: props.enrollment_level,
    student_height_127: props.student_height_127,
    city_127: props.city_127,
    facebook: props.facebook,
    twitter: props.twitter,
    instangram: props.instangram,
    linkedin: props.linkedin,
    snapchat: props.snapchat,
    skype: props.skype,
    classification: props.classification,
    highest_level_of_education_completed: props.highest_level_of_education_completed,
    total_credits_hoursoveral_gpa: props.total_credits_hoursoveral_gpa,
    overal_gpa: props.overal_gpa,
    primary_campus: props.primary_campus,
    country_of_citizenship: props.country_of_citizenship,
    country_of_residence: props.country_of_residence,
    state_province_of_residency: props.state_province_of_residency,
    total_credits_hours: props.total_credits_hours,
    passport_number: props.passport_number,
    passport_expiration_date: props.passport_expiration_date,
    visa_number: props.visa_number,
    visa_issued_date: props.visa_issued_date,
    visa_issued_country: props.visa_issued_country,
    visa_expiration_date: props.visa_expiration_date,
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
})(BasicContact);
