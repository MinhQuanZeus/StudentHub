/* eslint-disable camelcase */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Icon, PrimaryButton, Persona } from 'office-ui-fabric-react';
import { format } from 'date-fns';
import Status from '../Status';

import css from './Details.m.scss';
import Priority from '../Priority';

class Details extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      isOpen,
      onDismiss,
      subject,
      status,
      category_name,
      sub_category_name,
      priority,
      is_public,
      created_at,
      description,
    } = this.props;
    return (
      <Modal className={css.Details} isOpen={isOpen} onDismiss={onDismiss}>
        <div className={css.Header}>
          <h2>Details</h2>
          <Icon iconName="Cancel" onClick={onDismiss} />
        </div>
        <div className={css.Body}>
          <div>
            <div>
              <label>Title</label>
              <div>{subject}</div>
            </div>
            <div>
              <label>Status</label>
              <Status type={status} />
            </div>
            <div>
              <label>Category</label>
              <div>{category_name}</div>
            </div>
            <div>
              <label>Sub Category</label>
              <div>{sub_category_name}</div>
            </div>
            <div>
              <label>Priority</label>
              <Priority name={priority} />
            </div>
            <div>
              <label>Dispatch Type</label>
              <div>{is_public ? 'Public' : 'Private'}</div>
            </div>
            <div>
              <label>Date Created</label>
              <div>{format(created_at, 'DD MMM YYYY')}</div>
            </div>
            <div>
              <label>Description</label>
              <div>{description}</div>
            </div>
          </div>
          <div>
            <div>
              <label>To</label>
              <ul>
                <li>
                  <Persona text="Michael" />
                </li>
                <li>
                  <Persona text="Evi" />
                </li>
                <li>
                  <Persona text="Justin" />
                </li>
                <li>
                  <Persona text="Kery" />
                </li>
                <li>
                  <Persona text="Kery" />
                </li>
              </ul>
            </div>
            <div>
              <label>Attachment</label>
              <ul>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
            </div>
          </div>
        </div>
        <div className={css.Footer}>
          <PrimaryButton text="View More Details" />
        </div>
      </Modal>
    );
  }
}

Details.defaultProps = {
  isOpen: false,
};

Details.propTypes = {
  isOpen: PropTypes.bool,
  onDismiss: PropTypes.func,
  subject: PropTypes.string,
  status: PropTypes.string,
  category_name: PropTypes.string,
  sub_category_name: PropTypes.string,
  priority: PropTypes.string,
  is_public: PropTypes.string,
  created_at: PropTypes.string,
  description: PropTypes.string,
};

export default Details;
