import React, { Component } from 'react';
import { Checkbox } from 'office-ui-fabric-react';
import css from './AdminDetails.m.scss';

class AdminDetails extends Component {
  render() {
    return (
      <div className={css.AdminDetails}>
        <label>Admin Details</label>
        <label>Flag Owner</label>
        <div></div>
        <label>Created By</label>
        <div></div>
        <label>Date Assigned</label>
        <div></div>
        <Checkbox label="This flag into a Notification as well" />
      </div>
    );
  }
}

export default AdminDetails;
