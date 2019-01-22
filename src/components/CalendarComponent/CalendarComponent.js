import React from 'react';
import BigCalendar from '../../modules/react-big-calendar-master/src'
import moment from 'moment'
import  '../CalendarComponent/CalendarComponent.css'

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = BigCalendar.momentLocalizer(moment) // or globalizeLocalizer

export const CalendarComponent = (props) => {
    return (
      <div className='background'>
        <div className='container'>
          <div className='section-sidebar'>
          <h2>Calendar</h2>
            <div className="create-event-btn">Create Event</div>
              <div className="catagory-list">
                <h3>Category List</h3>
                  <div className="catagory-list-labels">
                    <div><span className="red-dot"></span> <p className="meeting-label">Meeting</p></div>
                    <div><span className="purple-dot"></span> <p className="classes-label">Classes</p></div>
                    <div><span className="gold-dot"></span> <p className="program-event-label">Program Event</p></div>
                    <div><span className="brown-dot"></span> <p className="school-event-label">School Event</p></div>
                    <div><span className="green-dot"></span> <p className="checklist-label">Checklist</p></div>
                  </div>
                </div>
                <div className="invitation-list">
                  <h3>Invitation List</h3>
                    <p className="invitation"><b>Joe</b> Invited you in his event <b>"Meeting Staff Only"</b><br></br><span>2 Hours Ago</span></p>
                    <p className="invitation"><b>Risa</b> Invited you in his event <b>"Design Fest 2018"</b><br></br><span>Yesterday</span></p>
                </div>
              </div>
            <div className='calendar-container'>
              <BigCalendar
                localizer={localizer}
                eventPropGetter={event => ({className: 'category-' + event.calendarCategory})}
                events={props.calendarData}
                views={['month']}
                startAccessor='start'
                endAccessor='end'
                onNavigate={props.onDateChanged}
                defaultDate={new Date()}
              />
            </div>
        </div>
      </div>
    )
};