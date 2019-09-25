import React from 'react';
import css from './EventDetailsComponent.m.scss';
import PropTypes from 'prop-types';
import moment from 'moment';

export const EventDetailsComponent = (props) => {
  const { event } = props;
  const itemDetails = event.data || {};
  return (
    <div>
      <div className={css.EventCard}>
        <div className={css.LeftSide}>
          <p>{moment(event.start).format('ddd')}</p>
          <h4>{moment(event.start).format('D')}</h4>
        </div>
        <div className={css.RightSide}>
          <div className={css.EventTitle}>{itemDetails.check_list_name}</div>
        </div>
      </div>
      <div className={css.EventDetails}>
        <div>
          <div className={css.Label}>Overview</div>
          <div className={css.Info}>{itemDetails.overview}</div>
          <div className={css.Label}>Description</div>
          <div className={css.Info}>{itemDetails.description}</div>
        </div>
        <div className={css.ContactInfo}>
          <p className={css.Header}>CONTACT INFO</p>
          <div className={css.GridBox}>
            <div className="grid_cell">
              <p>Phone</p>
              <span>{itemDetails.phone}</span>
            </div>
            <div className="grid_cell">
              <p>Fax</p>
              <span>{itemDetails.fax}</span>
            </div>
            <div className="grid_cell">
              <p>Email</p>
              <span>{itemDetails.email}</span>
            </div>
            <div className="grid_cell">
              <p>Website</p>
              <span>{itemDetails.website}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

EventDetailsComponent.propTypes = {
  event: PropTypes.object,
};

export default EventDetailsComponent;
