import React, { Component } from 'react';
import { CalendarComponent } from '../../components/CalendarComponents/CalendarComponent';
import sharedStyles from '../../styles/styles.module.css';
import CalendarPopup from '../../components/CalendarComponents/CalendarPopup';
import { getAccessToken } from '../../helpers';
import { apiConstants } from '../../constants/applicationConstants';

const popup = (event, e) => {
  if (event.category === 'classes') {
    return;
  }
  const popupDIV = document.getElementById('popupDIV');

  popupDIV.className -= 'hideClass';

  const mouseX = e.nativeEvent.clientX;
  const mouseY = e.nativeEvent.clientY;
  const screenX = window.innerWidth;
  const screenY = window.innerHeight;
  if (mouseX + 604 > screenX) {
    {
      /* if too far right*/
    }
    popupDIV.style.left = mouseX - 604 + 'px';
  } else {
    popupDIV.style.left = mouseX + 'px';
  }

  if (mouseY + 462 > screenY) {
    {
      /* if too low*/
    }
    popupDIV.style.top = mouseY - 0 + 'px';
  }
  if (mouseY - 462 < 0) {
    {
      /* if too high*/
    }
    popupDIV.style.top = mouseY - 200 + 'px';
  } else {
    popupDIV.style.top = mouseY - 240 + 'px';
  }
};

class CalendarContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      calendarEvents: [],
      currentEvent: {},
    };
  }

  componentDidMount() {
    this.onDateChanged(new Date());
  }

  _getEndDates(startDate, endDate = null) {
    const firstDay = endDate
      ? new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() - 1)
      : new Date(startDate.getFullYear(), startDate.getMonth(), 1);
    const lastDay = endDate
      ? new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate() + 2)
      : new Date(startDate.getFullYear(), startDate.getMonth() + 1, 1);
    return {
      firstDay: firstDay.toISOString().split('T')[0],
      lastDay: lastDay.toISOString().split('T')[0],
    };
  }

  getCalendarData(calendarData) {
    return calendarData.calendarData.length === 0
      ? [
          {
            title: '',
            allDay: false,
            start: null,
            end: null,
            category: '',
            calendarCategory: '',
          },
        ]
      : calendarData.calendarData.map((data) => {
          data['calendarCategory'] = 'checklist';
          return data;
        });
  }

  async onDateChanged(startDate, endDate = null) {
    const { firstDay, lastDay } = this._getEndDates(startDate, endDate);
    this.setState(() => ({
      isLoading: true,
      calendarEvents: [],
    }));
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': getAccessToken(),
      },
    };

    try {
      const responses = await Promise.all([
        fetch(`${apiConstants.BACKEND_URL}student/class/range_time?from_date=${firstDay}&to_date=${lastDay}`, options),
        fetch(`${apiConstants.BACKEND_URL}student/check_list/range_time?from_date=${firstDay}&to_date=${lastDay}`, options),
      ]);
      const bodies = await Promise.all(responses.map((o) => o.json()));
      let events = [];
      if (bodies[0].data && bodies[0].data.length) {
        const temp = bodies[0].data.map((obj) => {
          return {
            title: obj.title,
            allDay: obj.allDay,
            start: new Date(obj.start_time),
            end: new Date(obj.end_time),
            category: 'classes',
          };
        });

        events = [...events, ...temp];
      }
      if (bodies[1].data && bodies[1].data.length) {
        const temp = bodies[1].data.map((obj) => {
          return {
            title: obj.check_list_name,
            allDay: true,
            start: new Date(obj.due_date),
            end: new Date(obj.due_date),
            category: 'checklist',
            data: obj,
          };
        });

        events = [...events, ...temp];
      }
      this.setState(() => ({
        isLoading: false,
        calendarEvents: events,
      }));
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    // const calendarData = this.getCalendarData(this.props.calendarData);
    const { calendarEvents, currentEvent } = this.state;
    return (
      <div className={sharedStyles['']}>
        <CalendarComponent
          calendarData={calendarEvents || []}
          onDateChanged={(startDate, endDate) => this.onDateChanged(startDate, endDate)}
          onSelectEvent={(event, e) => {
            this.setState({ currentEvent: event });
            popup(event, e);
          }}
        />
        <CalendarPopup eventDetail={currentEvent} />
      </div>
    );
  }
}

// const mapStateToProps = (state) => {
//   return {
//     calendarData: state.calendarData,
//   };
// };
//
// const mapDispatchToProps = (dispatch) => {
//   return {
//     onFetchCalendarData: (x_access_token, from_date, to_date) =>
//       dispatch(onFetchCalendarData(x_access_token, from_date, to_date)),
//   };
// };

export default CalendarContainer;
