/* eslint-disable react/prop-types */
/* global fetch */
import React, { Component } from 'react';
import css from './EmergencyContact.m.scss';
import { DefaultButton, Icon, PrimaryButton } from 'office-ui-fabric-react';
import { apiConstants } from '../../constants/applicationConstants';
import { withFormik } from 'formik';
import Textbox from '../../native-ui/Textbox';
import { EMERGENCY_CONTACT_RELATIONSHIP_OPTIONS } from '../../constants';
import Select from '../../native-ui/Select';
import { getAccessToken, formatPhoneNumberIntl, formatPhoneNumberNtl } from '../../helpers';

class EmergencyContact extends Component {
  constructor(props) {
    super(props);

    this.state = {
      emergencyContacts: [],
    };
  }

  onCancel = () => {
    const { emergencyContacts } = this.state;
    this.props.setStatus({ isEditing: false });
    this.initStateValue(emergencyContacts);
  };

  initStateValue = (props) => {
    if (!props || props.length === 0) {
      this.props.setValues({
        id1: null,
        name1: '',
        email1: '',
        relationship1: '',
        phone1: '',
        id2: null,
        name2: '',
        email2: '',
        relationship2: '',
        phone2: '',
      });

      return;
    }

    if (props.length === 1) {
      this.props.setValues({
        id1: props[0].id,
        name1: props[0].contact_name,
        email1: props[0].email,
        relationship1: props[0].relationship,
        phone1: formatPhoneNumberNtl(props[0].phone),
        id2: null,
        name2: '',
        email2: '',
        relationship2: '',
        phone2: '',
      });
      return;
    }
    // handle emergency contacts always display top two contacts by id
    props = props.sort((a, b) => a.id - b.id);

    if (props.length >= 2) {
      this.props.setValues({
        id1: props[0].id,
        name1: props[0].contact_name,
        email1: props[0].email,
        relationship1: props[0].relationship,
        phone1: formatPhoneNumberNtl(props[0].phone),
        id2: props[1].id,
        name2: props[1].contact_name,
        email2: props[1].email,
        relationship2: props[1].relationship,
        phone2: formatPhoneNumberNtl(props[1].phone),
      });
    }
  };

  async initialize() {
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': getAccessToken(),
        },
      };
      const response = await fetch(`${apiConstants.BACKEND_URL}student/emergency_contacts`, options);
      const body = await response.json();
      if (body.success) {
        this.setState(() => ({ isLoading: false, emergencyContacts: body.data }));
        this.initStateValue(body.data);
      }
    } catch (e) {
      this.setState(() => ({ isLoading: false }));
    }
  }

  componentDidMount() {
    this.initialize();
  }

  updatePhoneNumber = (key, value) => {
    this.props.setFieldValue(key, formatPhoneNumberNtl(value));
  };

  getViewMode = () => {
    const { values } = this.props;

    return (
      <div>
        <table className="table">
          <tbody>
            <tr>
              <td>
                <p>{values.name1}</p>
                <p>{values.relationship1}</p>
              </td>
              <td>
                <p>{values.email1}</p>
                <p>{formatPhoneNumberNtl(values.phone1)}</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>{values.name2}</p>
                <p>{values.relationship2}</p>
              </td>
              <td>
                <p>{values.email2}</p>
                <p>{formatPhoneNumberNtl(values.phone2)}</p>
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
        <hr/>
        <Textbox label="Name" name="name1" value={values.name1} onChange={handleChange}
          message={errors && errors.name1}/>
        <Textbox label="Email address" name="email1" value={values.email1} onChange={handleChange}
          message={errors && errors.email1}/>
        <Select
          label="Relationship"
          name="relationship1"
          value={values.relationship1}
          options={EMERGENCY_CONTACT_RELATIONSHIP_OPTIONS}
          onItemSelected={(value, displayValue) => setFieldValue('relationship1', value)}
        />
        <Textbox label="Phone 1" name="phone1" value={values.phone1} onChange={(event) => this.updatePhoneNumber('phone1', event.target.value)}
          message={errors && errors.phone1}/>
        <div className={css.FormHeader}>Emergency Contact 2</div>
        <hr/>
        <Textbox label="Name" name="name2" value={values.name2} onChange={handleChange}
          message={errors && errors.name2}/>
        <Textbox label="Email address" name="email2" value={values.email2} onChange={handleChange}
          message={errors && errors.email2}/>
        <Select
          label="Relationship"
          name="relationship2"
          value={values.relationship2}
          options={EMERGENCY_CONTACT_RELATIONSHIP_OPTIONS}
          onItemSelected={(value, displayValue) => setFieldValue('relationship2', value)}
        />
        <Textbox label="Phone 2" name="phone2" value={values.phone2} onChange={(event) => this.updatePhoneNumber('phone2', event.target.value)}
          message={errors && errors.phone2}/>
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
      <div className={css.EmergencyContact}>
        <div>EMERGENCY CONTACT</div>
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
  mapPropsToValues: () => ({
    id1: '',
    name1: '',
    email1: '',
    relationship1: '',
    phone1: '',
    id2: '',
    name2: '',
    email2: '',
    relationship2: '',
    phone2: '',
  }),
  handleSubmit: async (values, bag) => {
    try {
      const data = [
        {
          id: values.id1,
          email: values.email1,
          contact_name: values.name1,
          relationship: values.relationship1,
          phone: formatPhoneNumberIntl(values.phone1),
        },
        {
          id: values.id2,
          email: values.email2,
          contact_name: values.name2,
          relationship: values.relationship2,
          phone: formatPhoneNumberIntl(values.phone2),
        },
      ];
      const options = {
        method: 'Post',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': getAccessToken(),
        },
        body: JSON.stringify(data),
      };
      const response = await fetch(`${apiConstants.BACKEND_URL}student/emergency_contacts`, options);
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
