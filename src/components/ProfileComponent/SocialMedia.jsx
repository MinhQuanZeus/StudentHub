import React, { Component } from 'react';
import css from './SocialMedia.m.scss';
import { DefaultButton, Icon, PrimaryButton } from 'office-ui-fabric-react';
import { apiConstants } from '../../constants/applicationConstants';
import { withFormik } from 'formik';
import Textbox from '../../native-ui/Textbox';

import GmailIcon from '../../images/gmail.svg';
import FacebookIcon from '../../images/facebook_logo.svg';
import LinedinIcon from '../../images/linkedin.svg';

class SocialMedia extends Component {
  constructor(props) {
    super(props);
  }

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
              <td>
                <div>
                  <img src={GmailIcon} width="20px" height="20px" alt=""/>
                  <div>Gmail</div>
                </div>
              </td>
              <td>{values.gmail}</td>
            </tr>
            <tr>
              <td>
                <div>
                  <img src={FacebookIcon} width="20px" height="20px" />
                  <div>Facebook</div>
                </div>
              </td>
              <td>{values.facebook}</td>
            </tr>
            <tr>
              <td>
                <div>
                  <img src={LinedinIcon} width="20px" height="20px" />
                  <div>Linkedin</div>
                </div>
              </td>
              <td>{values.linkedin}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  getEditMode = () => {
    const { values, handleChange, handleSubmit, errors } = this.props;
    const { avatarUrl } = this.props;
    return (
      <form onSubmit={handleSubmit} noValidate>
        <Textbox labelIcon={GmailIcon} label="Gmail" value={values.gmail} onChange={handleChange} message={errors && errors.gmail} />
        <Textbox
          labelIcon={FacebookIcon}
          label="Facebook"
          value={values.facebook}
          onChange={handleChange}
          message={errors && errors.facebook}
        />
        <Textbox
          labelIcon={LinedinIcon}
          label="Linkedin"
          value={values.linkedin}
          onChange={handleChange}
          message={errors && errors.linkedin}
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
      <div className={css.SocialMedia}>
        <div>SOCIAL MEDIA</div>
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
})(SocialMedia);
