import React, { Component } from 'react';
import css from './Address.m.scss';
import { Icon, PrimaryButton } from 'office-ui-fabric-react';
import { apiConstants } from '../../constants/applicationConstants';
import { withFormik } from 'formik';
import AddressItem from './AddressItem';
import AddressRegister from './AddressRegister';

class Address extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenAddAddress: false,
    };
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
    const { isEditing } = this.props.status;
    return (
      <div className={css.ViewMode}>
        <p>Current Address</p>
        <p>
          Mustika Ratu Street No 34, Lampung <br />
          Indonesia, 34381
        </p>
        <hr />
        {isEditing && (
          <button text="Cancel" onClick={this.onCancel}>
            Cancel
          </button>
        )}
      </div>
    );
  };

  getEditMode = () => {
    const { handleSubmit } = this.props;
    const { isOpenAddAddress } = this.state;
    return (
      <div>
        <form onSubmit={handleSubmit} noValidate>
          <div className={css.FormHeader}>
            Other Address List
            <div>(choose one to set the preferred email address)</div>
          </div>
          <AddressItem />
          <div>
            <PrimaryButton text="Update" type="submit" />
          </div>
        </form>
        <div className={css.AddAddress}>
          <hr />
          {!isOpenAddAddress && (
            <p onClick={() => this.setState({ isOpenAddAddress: true })}>
              <Icon iconName="CalculatorAddition" />
              &ensp;&ensp;<span>Add New Address</span>
            </p>
          )}
          {isOpenAddAddress && <AddressRegister onCancel={() => this.setState({ isOpenAddAddress: false })} />}
          <hr />
        </div>
      </div>
    );
  };

  render() {
    const { setStatus } = this.props;
    const { isEditing } = this.props.status;
    return (
      <div className={css.Address}>
        <div>Address</div>
        {!isEditing && (
          <div className={css.EditButton} onClick={() => setStatus({ isEditing: true })}>
            <Icon iconName="EditSolid12" />
            {'  '}
            Edit
          </div>
        )}
        <div className="card">
          <div className="card-body">
            {this.getViewMode()}
            {isEditing && this.getEditMode()}
          </div>
        </div>
      </div>
    );
  }
}

export default withFormik({
  enableReinitialize: true,
  mapPropsToStatus: () => ({
    isEditing: false,
    isOpenAddAddress: false,
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
})(Address);
