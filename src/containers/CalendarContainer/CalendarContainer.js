import React, { Component } from "react";
import { CalendarComponent } from "../../components/CalendarComponents/CalendarComponent";
import { onFetchCalendarData } from "../../actions/CalendarActions/CalendarActions";
import connect from "react-redux/es/connect/connect";
import sharedStyles from "../../styles/styles.module.css";
import { AppContext } from "../AppContext";
import CalendarPopup from '../../components/CalendarComponents/CalendarPopup'

let popup = (event, e) => {
  const popupDIV = document.getElementById("popupDIV");
      
        popupDIV.className -= "hideClass"
      

        let mouseX = e.nativeEvent.clientX;
        let mouseY = e.nativeEvent.clientY;
        let screenX = window.innerWidth;
        let screenY = window.innerHeight;
        console.log(mouseX);
        console.log(mouseY);
        if (mouseX + 604 > screenX) {  {/* if too far right*/}
          popupDIV.style.left = mouseX - 604 + 'px';
        }
        else {
          popupDIV.style.left = mouseX + 'px';
        }

        if (mouseY + 462 > screenY) { {/* if too low*/}
          popupDIV.style.top = mouseY - 0 + 'px';
        }
        if (mouseY - 462 < 0) { {/* if too high*/}
          popupDIV.style.top = mouseY - 200 + 'px';
        }

        else {
          popupDIV.style.top = mouseY - 240 + 'px';
        }
  }

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
    return calendarData.calendarData.length === 0
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
        <CalendarComponent 
        calendarData={calendarData} 
        onDateChanged={(newDate) => this.onDateChanged(newDate)}
        onSelectEvent={popup}
        />
        <CalendarPopup/>
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
