import React from 'react';
import BigCalendar from '../../modules/react-big-calendar/src';
import moment from 'moment';
import css from './CalendarComponent.m.scss';
import PropTypes from 'prop-types';

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

export const CalendarComponent = (props) => {
  return (
    <div className={css.CalendarContent}>
      <BigCalendar
        localizer={localizer}
        eventPropGetter={(event) => ({ className: 'category-' + event.calendarCategory })}
        events={props.calendarData}
        views={['month', 'week', 'day']}
        startAccessor="start"
        endAccessor="end"
        defaultDate={new Date()}
        onSelectEvent={props.onSelectEvent}
        date={props.selectedDate}
        onNavigate={(event) => props.onNavigate(event)}
        onRangeChange={(date) => {
          if (date && !Array.isArray(date) && typeof date === 'object') {
            props.onDateChanged(date.start, date.end);
          } else if (date && Array.isArray(date) && date.length > 0) {
            props.onDateChanged(date[0], date[date.length - 1]);
          } else if (date) {
            props.onDateChanged(date);
          } else {
            props.onDateChanged(new Date());
          }
        }}
      />
    </div>
  );
};

CalendarComponent.propTypes = {
  onDateChanged: PropTypes.func,
  onSelectEvent: PropTypes.func,
  calendarData: PropTypes.array,
  onNavigate: PropTypes.func,
  selectedDate: PropTypes.object,
};
