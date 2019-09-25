import React from 'react';
import BigCalendar from '../../modules/react-big-calendar/src';
import moment from 'moment';
import css from './CalendarComponent.m.scss';
import PropTypes from 'prop-types';
import { capitalizeFirstLetter } from '../../helpers';
import { format } from 'date-fns';

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = BigCalendar.momentLocalizer(moment); // or globalizeLocalizer


const prepareEventsForMobileView = (events) => {
  const eventList = {};
  const allEvent = [];
  events.map((event) => {
    const date = format(event.start, 'YYYY-MM-DD');
    const preparData = {
      title: '',
      allDay: false,
      start: new Date(date),
      end: new Date(date),
      category: '',
      multiEvents: [event],
      categoriesName: [event.category],
      isMobileViewMode: true,
    };
    if (eventList[date] && eventList[date].multiEvents) {
      eventList[date].multiEvents.push(event);
      if (!eventList[date].categoriesName.includes(event.category)) {
        eventList[date].categoriesName.push(event.category);
      }
    } else {
      eventList[date] = preparData;
    }
  });
  Object.keys(eventList).map((key, index) => {
    allEvent.push(eventList[key]);
  });
  return allEvent;
};

const CalendarToolbar = (props) => {
  const { label, onNavigate } = props;
  return (
    <div className={css.Toolbar}>
      <img onClick={() => onNavigate('PREV')} src={'/images/chevron-left.svg'} alt="Chevron" className={css.ChevronIcon} />
      <span className={`rbc-toolbar-label ${css.ToolbarLabel}`}>{label}</span>
      <img onClick={() => onNavigate('NEXT')} src={'/images/chevron-right.svg'} alt="Chevron Icon" className={css.ChevronIcon} />
    </div>
  );
};

const CalendarEvent = (props) => {
  const { title, event } = props;
  const { isMobileViewMode, categoriesName } = event;
  return (
    <div>
      {isMobileViewMode ? (
        <div className={css.EventWrapperForMobile}>
          {categoriesName &&
            categoriesName.map((item, idx) => <span key={idx} className={`${css.EventOval} ${css[capitalizeFirstLetter(item)]}`}></span>)}
        </div>
      ) : (
        title
      )}
    </div>
  );
};

export const CalendarComponent = (props) => {
  const isMobileViewMode = props.viewMode === 'MOBILE' ? true : false;
  const Toolbar = isMobileViewMode ? CalendarToolbar : null;
  const events = isMobileViewMode ? prepareEventsForMobileView(props.calendarData) : props.calendarData;
  const calendarViews = isMobileViewMode ? ['month'] : ['month', 'week', 'day'];

  return (
    <div className={css.CalendarContent}>
      <BigCalendar
        localizer={localizer}
        eventPropGetter={(event) => ({ className: 'category-' + event.calendarCategory })}
        events={events}
        views={calendarViews}
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
        components={{
          event: CalendarEvent,
          toolbar: Toolbar,
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
  viewMode: PropTypes.string,
};

CalendarToolbar.propTypes = {
  label: PropTypes.node.isRequired,
  onNavigate: PropTypes.func.isRequired,
};

CalendarEvent.propTypes = {
  title: PropTypes.string,
  event: PropTypes.object,
};
