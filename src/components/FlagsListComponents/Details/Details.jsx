/* eslint-disable camelcase */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Icon, PrimaryButton, Persona } from 'office-ui-fabric-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import Status from '../../Status';

import css from './Details.m.scss';
import Priority from '../../Priority';

class Details extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      isOpen,
      onDismiss,
      id,
      subject,
      status,
      priority,
      is_public,
      created_at,
      description,
      receivers,
      documents,
      category,
      sub_category,
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
              <div>{category && category.name ? category.name : null}</div>
            </div>
            <div>
              <label>Sub Category</label>
              <div>{sub_category && sub_category.name ? sub_category.name : null}</div>
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
                {receivers &&
                  receivers.length > 0 &&
                  receivers.map((o) => (
                    <li key={o.id}>
                      <Persona text={o.full_name} imageUrl={o.photo_url} />
                    </li>
                  ))}
              </ul>
            </div>
            <div>
              <label>Attachment</label>
              <ul>
                {documents &&
                  documents.length > 0 &&
                  documents.map((o, idx) => (
                    <li key={idx}>
                      <img src={o.url} />
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
        <div className={css.Footer}>
          <Link to={`/flags/${id}`}>
            <PrimaryButton text="View More Details" />
          </Link>
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
  id: PropTypes.string,
  subject: PropTypes.string,
  status: PropTypes.string,
  priority: PropTypes.string,
  is_public: PropTypes.bool,
  created_at: PropTypes.string,
  description: PropTypes.string,
  receivers: PropTypes.array,
  documents: PropTypes.array,
  category: PropTypes.object,
  sub_category: PropTypes.object,
};

export default Details;
