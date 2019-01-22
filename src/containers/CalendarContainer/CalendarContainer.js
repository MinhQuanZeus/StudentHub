import React, { Component } from "react";
import { CalendarComponent } from "../../components/CalendarComponent/CalendarComponent";
import { onFetchCalendarData } from "../../actions/CalendarActions/CalendarActions";
import connect from "react-redux/es/connect/connect";
import sharedStyles from "../../styles/styles.module.css";
import { AppContext } from "../AppContext";

class CalendarContainer extends Component {
  componentWillMount() {
    this.onDateChanged(new Date());
  }

  _getEndDates(date) {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return {
        firstDay: firstDay.toISOString().split('T')[0],
        lastDay: lastDay.toISOString().split('T')[0]
    }
  }

  getCalendarData(calendarData) {
    return calendarData.calendarData.length == 0
      ? [{
          title: "",
          allDay: false,
          start: null,
          end: null,
          category: "",
          calendarCategory: "",
        }]
      : calendarData.calendarData.map((data) => {
        data['calendarCategory'] = 'checklist';
        return data;
      });
  }

  onDateChanged(newDate) {
    const { firstDay, lastDay } = this._getEndDates(newDate);
    this.props.onFetchCalendarData(this.context.user.x_access_token, firstDay, lastDay);
  }

  render() {
    if(this.props.calendarData.loading){
        return null;
    }

    const calendarData = this.getCalendarData(this.props.calendarData);
    return (
      <div className={sharedStyles[""]}>
        <CalendarComponent calendarData={calendarData} 
        onDateChanged={(newDate) => this.onDateChanged(newDate)}/>
      </div>
    );
  }
}

CalendarContainer.contextType = AppContext;

const mapStateToProps = state => {
  return {
    calendarData: state.calendarData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchCalendarData: (x_access_token, from_date, to_date) =>
      dispatch(onFetchCalendarData(x_access_token, from_date, to_date))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CalendarContainer);
