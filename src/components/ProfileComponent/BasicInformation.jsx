import React, { Component } from 'react';
import css from './BasicInformation.m.scss';
import { DefaultButton, Icon, PrimaryButton, Spinner, SpinnerSize } from 'office-ui-fabric-react';
import { apiConstants } from '../../constants/applicationConstants';
import { withFormik } from 'formik';
import Textbox from '../../native-ui/Textbox';
import RadioButton from '../../native-ui/RadioButton';
import { ETHNICITY_OPTIONS, GENDER_OPTIONS, INTERNATIONAL_OPTIONS, LANGUAGE_OPTIONS } from '../../constants';
import Select from '../../native-ui/Select';

class BasicInformation extends Component {

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
              <td>Photo Icon</td>
              <td>Photo Icon</td>
            </tr>
            <tr>
              <td>Student ID</td>
              <td>{values.record_id}</td>
            </tr>
            <tr>
              <td>Preferred Name</td>
              <td>{values.preferred_name}</td>
            </tr>
            <tr>
              <td>Name</td>
              <td>{values.first_name + ' ' + values.last_name}</td>
            </tr>
            <tr>
              <td>Gender</td>
              <td>{values.gender}</td>
            </tr>
            <tr>
              <td>Ethnicity</td>
              <td>{values.ethnicity}</td>
            </tr>
            <tr>
              <td>Language</td>
              <td>{values.language}</td>
            </tr>
            <tr>
              <td>International Student</td>
              <td>{values.international_student}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  getEditMode = () => {
    const { values, handleChange, handleSubmit, isSubmitting, errors, setFieldValue } = this.props;
    const { avatarUrl } = this.props;
    return (
      <form onSubmit={handleSubmit} noValidate>
        <div>
          <label>Photo Icon</label>
          <label className={css.UploadPhoto} htmlFor="fileInput">
            <img src={avatarUrl} alt="image"/>
            {!isSubmitting ? (
              <span>
                <div className={css.HoverSelectImage}>
                  <Icon iconName="CloudUpload" className="ms-IconExample" />
                  <br />
                  <span>Upload photo</span>
                </div>
                <div className={css.HoverBackground} />
                <input id="fileInput" type="file" onChange={this.onInputAvatar} accept="image/x-png,image/jpeg" />
              </span>
            ) : null}
            {isSubmitting ? (
              <div className={css.Spinner}>
                <Spinner size={SpinnerSize.medium} />
              </div>
            ) : null}
          </label>
        </div>
        <hr />
        <Textbox label="Student ID" value={values.record_id} onChange={handleChange} readOnly={true} message={errors && errors.record_id} />
        <Textbox label="Preferred Name" value={values.preferred_name} onChange={handleChange} message={errors && errors.preferred_name} />
        <Textbox
          label="First Name"
          value={values.first_name}
          readOnly={true}
          onChange={handleChange}
          message={errors && errors.first_name}
        />
        <Textbox label="Last Name" value={values.last_name} readOnly={true} onChange={handleChange} message={errors && errors.last_name} />
        <RadioButton
          label="Gender"
          name="gender"
          value={values.gender}
          options={GENDER_OPTIONS}
          onItemSelected={(value, displayValue) => setFieldValue('gender', value)}
        />
        <Select
          label="Ethnicity"
          name="ethnicity"
          value={values.ethnicity}
          options={ETHNICITY_OPTIONS}
          onItemSelected={(value, displayValue) => setFieldValue('ethnicity', value)}
        />
        <Select
          label="Language"
          name="language"
          value={values.language}
          options={LANGUAGE_OPTIONS}
          onItemSelected={(value, displayValue) => setFieldValue('language', value)}
        />
        <RadioButton
          label="International Student"
          name="international_student"
          value={values.international_student}
          options={INTERNATIONAL_OPTIONS}
          disabled={true}
          onItemSelected={(value, displayValue) => setFieldValue('international_student', value)}
        />
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
      <div className={css.BasicInformation}>
        <div>BASIC INFORMATION</div>
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
})(BasicInformation);
