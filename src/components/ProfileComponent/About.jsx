/* global fetch */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import css from './About.m.scss';
import { DefaultButton, Icon, PrimaryButton } from 'office-ui-fabric-react';
import { apiConstants } from '../../constants/applicationConstants';
import { withFormik } from 'formik';
import { getAccessToken } from '../../helpers';

class About extends Component {
  constructor(props) {
    super(props);
  }

  onCancel = () => {
    this.props.setStatus({ isEditing: false });
    this.initStateValue(this.props);
  };

  initStateValue = (props) => {
    this.props.setValues({
      recommendation: props.recommendation,
    });
  };

  getViewMode = () => {
    const { values } = this.props;
    return <div>{values.recommendation}</div>;
  };

  getEditMode = () => {
    const { values, handleChange, handleSubmit, isSubmitting } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <textarea className="form-control" name="recommendation" value={values.recommendation} onChange={handleChange} rows="4" />
        <div>
          <DefaultButton text="Cancel" onClick={this.onCancel} />
          <PrimaryButton text="Save" type="submit" disabled={isSubmitting} />
        </div>
      </form>
    );
  };

  render() {
    const { setStatus, viewMode } = this.props;
    const { isEditing } = this.props.status;
    return (
      <div className={css.About}>
        <div>ABOUT</div>
        {!isEditing && (
          <div className={css.EditButton} onClick={() => setStatus({ isEditing: true })}>
            <Icon iconName="EditSolid12" />
            {'  '}
            Edit
          </div>
        )}
        <div className="card">
          <div className="card-body">
            <label>About</label>
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
    recommendation: props.recommendation || '',
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
      const response = await fetch(`${apiConstants.BACKEND_URL}student/profile/about`, options);
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
})(About);
