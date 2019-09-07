import React, { Component } from 'react';
import css from './SocialMedia.m.scss';
import { DefaultButton, Icon, PrimaryButton } from 'office-ui-fabric-react';
import { apiConstants } from '../../constants/applicationConstants';
import { withFormik } from 'formik';
import Textbox from '../../native-ui/Textbox';

import GmailIcon from '../../images/gmail.svg';
import FacebookIcon from '../../images/facebook_logo.svg';
import LinedinIcon from '../../images/linkedin.svg';
import { getAccessToken } from '../../helpers';

class SocialMedia extends Component {

  onCancel = () => {
    this.props.setStatus({ isEditing: false });
    this.initStateValue(this.props);
  };

  initStateValue = (props) => {
    this.props.setValues({
      student_id: props.record_id,
      gmail: props.gmail,
      facebook: props.facebook,
      twitter: props.twitter,
      instangram: props.instangram,
      linkedin: props.linkedin,
      snapchat: props.snapchat,
      skype: props.skype,
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
                  <img src={FacebookIcon} width="20px" height="20px" alt=""/>
                  <div>Facebook</div>
                </div>
              </td>
              <td>{values.facebook}</td>
            </tr>
            <tr>
              <td>
                <div>
                  <img src={LinedinIcon} width="20px" height="20px" alt=""/>
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
    return (
      <form onSubmit={handleSubmit} noValidate>
        <Textbox name="gmail" labelIcon={GmailIcon} label="Gmail" value={values.gmail} onChange={handleChange}
          message={errors && errors.gmail}/>
        <Textbox
          labelIcon={FacebookIcon}
          label="Facebook"
          name="facebook"
          value={values.facebook}
          onChange={handleChange}
          message={errors && errors.facebook}
        />
        <Textbox
          name="linkedin"
          labelIcon={LinedinIcon}
          label="Linkedin"
          value={values.linkedin}
          onChange={handleChange}
          message={errors && errors.linkedin}
        />
        <div>
          <DefaultButton text="Cancel" onClick={this.onCancel}/>
          <PrimaryButton text="Save" type="submit"/>
        </div>
      </form>
    );
  };

  render() {
    const { setStatus, viewMode } = this.props;
    const { isEditing } = this.props.status;
    return (
      <div className={css.SocialMedia}>
        <div>SOCIAL MEDIA</div>
        {!isEditing && (
          <div className={css.EditButton} onClick={() => setStatus({ isEditing: true })}>
            <Icon iconName="EditSolid12"/>
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
    student_id: props.record_id,
    gmail: props.gmail,
    facebook: props.facebook,
    twitter: props.twitter,
    instangram: props.instangram,
    linkedin: props.linkedin,
    snapchat: props.snapchat,
    skype: props.skype,
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
      const response = await fetch(`${apiConstants.BACKEND_URL}student/profile/update_social`, options);
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
