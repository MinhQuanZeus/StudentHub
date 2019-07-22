import React, { Component } from 'react';
import css from './EmergencyContact.m.scss';
import { DefaultButton, Icon, PrimaryButton } from 'office-ui-fabric-react';
import { apiConstants } from '../../constants/applicationConstants';
import { withFormik } from 'formik';
import Textbox from '../../native-ui/Textbox';
import { EMERGENCY_CONTACT_RELATIONSHIP_OPTIONS } from '../../constants';
import Select from '../../native-ui/Select';

class EmergencyContact extends Component {

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
    return (
      <div>
        <table className="table">
          <tbody>
            <tr>
              <td>
                <p>Septiandika Pratama</p>
                <p>Brother</p>
              </td>
              <td>
                <p>andikapratama48@gmail.com</p>
                <p>+123 456 789</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>Septiandika Pratama</p>
                <p>Brother</p>
              </td>
              <td>
                <p>andikapratama48@gmail.com</p>
                <p>+123 456 789</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  getEditMode = () => {
    const { values, handleChange, handleSubmit, errors, setFieldValue } = this.props;
    return (
      <form onSubmit={handleSubmit} noValidate>
        <div className={css.FormHeader}>Emergency Contact 1</div>
        <hr />
        <Textbox label="Name" value={values.record_id} onChange={handleChange} message={errors && errors.record_id} />
        <Textbox label="Email address" value={values.preferred_name} onChange={handleChange} message={errors && errors.preferred_name} />
        <Select
          label="Relationship"
          name="relationship"
          value={values.ethnicity}
          options={EMERGENCY_CONTACT_RELATIONSHIP_OPTIONS}
          onItemSelected={(value, displayValue) => setFieldValue('ethnicity', value)}
        />
        <Textbox label="Phone" value={values.first_name} onChange={handleChange} message={errors && errors.first_name} />
        <div className={css.FormHeader}>Emergency Contact 2</div>
        <hr />
        <Textbox label="Name" value={values.record_id} onChange={handleChange} message={errors && errors.record_id} />
        <Textbox label="Email address" value={values.preferred_name} onChange={handleChange} message={errors && errors.preferred_name} />
        <Select
          label="Relationship"
          name="relationship"
          value={values.ethnicity}
          options={EMERGENCY_CONTACT_RELATIONSHIP_OPTIONS}
          onItemSelected={(value, displayValue) => setFieldValue('ethnicity', value)}
        />
        <Textbox label="Phone" value={values.first_name} onChange={handleChange} message={errors && errors.first_name} />
        <div>
          <DefaultButton text="Cancel" onClick={this.onCancel} />
          <PrimaryButton text="Save" type="submit" />
        </div>
      </form>
    );
  };

  render() {
    const { setStatus } = this.props;
    const { isEditing } = this.props.status;
    return (
      <div className={css.EmergencyContact}>
        <div>EMERGENCY CONTACT</div>
        {!isEditing && (
          <div className={css.EditButton} onClick={() => setStatus({ isEditing: true })}>
            <Icon iconName="EditSolid12" />
            {'  '}
            Edit
          </div>
        )}
        <div className="card">
          <div className="card-body">{!isEditing ? this.getViewMode() : this.getEditMode()}</div>
        </div>
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
})(EmergencyContact);