import React from 'react';
import css from './EventListComponent.m.scss';
import PropTypes from 'prop-types';
import { capitalizeFirstLetter } from '../../helpers';

export const EventListComponent = (props) => {
  const { onShowHideEventDetails, eventList } = props;
  return (
    <div className={css.EventList}>
      {eventList.map((event, idx) => (
        <div
          key={idx}
          className={`${css.EventCard} ${css[capitalizeFirstLetter(event.category)]}`}
          onClick={() => onShowHideEventDetails(true, event)}
        >
          <div className={css.Title}>{event.title}</div>
        </div>
      ))}
    </div>
  );
};

EventListComponent.propTypes = {
  eventList: PropTypes.array,
  onShowHideEventDetails: PropTypes.func,
};

export default EventListComponent;
