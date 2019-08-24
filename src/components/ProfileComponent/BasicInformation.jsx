/* eslint-disable react/prop-types */
/* global FileReader, FormData, document, fetch */
import React, { Component } from 'react';
import css from './BasicInformation.m.scss';
import { DefaultButton, Icon, PrimaryButton, Spinner, SpinnerSize } from 'office-ui-fabric-react';
import { apiConstants } from '../../constants/applicationConstants';
import { withFormik } from 'formik';
import Textbox from '../../native-ui/Textbox';
import RadioButton from '../../native-ui/RadioButton';
import { ETHNICITY_OPTIONS, GENDER_OPTIONS, INTERNATIONAL_OPTIONS, LANGUAGE_OPTIONS } from '../../constants';
import Select from '../../native-ui/Select';
import { getAccessToken } from '../../helpers';

class BasicInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarUrl: props.photo_url,
    };
  }

  onCancel = () => {
    this.props.setStatus({ isEditing: false });
    this.initStateValue(this.props);
  };

  onInputAvatar = (event) => {
    if (event.target.files && event.target.files[0]) {
      const pattern = /image-|png|jpeg/;
      const file = event.target.files[0];
      if (!file || !file.type.match(pattern)) {
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (event) => {
        const url = event.target.result;
        // window.sessionStorage.setItem('oa_photo_url', url);
        // const avatar = document.getElementsByClassName('native-avatar');
        // if (avatar && avatar.length > 0) {
        //   avatar[0].src = url;
        // }
        this.setState({ avatarUrl: url });
        this.props.setFieldValue('prof_photo', file);
        this.props.setFieldValue('avatarUrl', url);
      };
    }
  };

  initStateValue = (props) => {
    this.props.setValues({
      prof_photo: '',
      photo_url: props.photo_url,
      first_name: props.first_name,
      last_name: props.last_name,
      middle_name: props.middle_name,
      prefer_name: props.prefer_name,
      birthdate: props.birthdate,
      gender: props.gender,
      ethnicity: props.ethnicity,
      international_student: props.international_student,
      student_id: props.record_id,
      salutation: props.salutation,
      language: props.language,
    });

    this.setState({ avatarUrl: props.photo_url });
  };

  getViewMode = () => {
    const { values } = this.props;
    const { avatarUrl } = this.state;
    return (
      <div>
        <table className="table">
          <tbody>
            <tr>
              <td>Photo Icon</td>
              <td>
                <img src={values.photo_url} alt="" className={css.Avatar} />
              </td>
            </tr>
            <tr>
              <td>Student ID</td>
              <td>{values.student_id}</td>
            </tr>
            <tr>
              <td>Preferred Name</td>
              <td>{values.prefer_name}</td>
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
    const { avatarUrl } = this.state;
    return (
      <form onSubmit={handleSubmit} noValidate>
        <div className={css.UploadPhotoContainer}>
          <label>Photo Icon</label>
          <label className={css.UploadPhoto} htmlFor="fileInput">
            <img src={avatarUrl || values.photo_url} alt="" />
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
        <Textbox label="Student ID" value={values.student_id} onChange={handleChange} readOnly={true} message={errors && errors.student_id} />
        <Textbox
          label="Preferred Name"
          name="prefer_name"
          value={values.prefer_name}
          onChange={handleChange}
          message={errors && errors.prefer_name}
        />
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
          // disabled={true}
          onItemSelected={(value, displayValue) => setFieldValue('international_student', value)}
        />
        <div>
          <DefaultButton text="Cancel" onClick={this.onCancel} />
          <PrimaryButton text="Save" type="submit" disabled={isSubmitting} />
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
    prof_photo: '',
    photo_url: props.photo_url,
    first_name: props.first_name,
    last_name: props.last_name,
    middle_name: props.middle_name,
    prefer_name: props.prefer_name,
    birthdate: props.birthdate,
    gender: props.gender,
    ethnicity: props.ethnicity,
    international_student: props.international_student,
    student_id: props.record_id,
    salutation: props.salutation,
    language: props.language,
    avatarUrl: '',
  }),
  handleSubmit: async (values, bag) => {
    try {
      const formData = new FormData();
      if (values['prof_photo']) {
        formData.append('prof_photo', values['prof_photo']);
      }
      formData.append('salutation', values['salutation']);
      formData.append('first_name', values['first_name']);
      formData.append('middle_name', values['middle_name']);
      formData.append('last_name', values['last_name']);
      formData.append('birthdate', values['birthdate']);
      formData.append('gender', values['gender']);
      formData.append('student_id', values['student_id']);
      formData.append('ethnicity', values['ethnicity']);
      formData.append('prefer_name', values['prefer_name']);
      formData.append('language', values['language']);
      formData.append('international_student', values['international_student']);
      const options = {
        method: 'PUT',
        headers: {
          'x-access-token': getAccessToken(),
        },
        body: formData,
      };
      const response = await fetch(`${apiConstants.BACKEND_URL}student/support/profile`, options);
      const body = await response.json();
      if (body.success) {
        bag.setStatus({ isEditing: false });
        bag.props.onSuccess();
        const avatar = document.getElementsByClassName('top-bar-avatar-sm');
        if (avatar && avatar.length > 0) {
          avatar[0].src = values['avatarUrl'];
        }
      }
    } catch (e) {
      console.log(e);
    } finally {
      bag.setSubmitting(false);
    }
  },
})(BasicInformation);
