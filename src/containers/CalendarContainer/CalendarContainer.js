import React, {Component} from "react";
import {CalendarComponent} from "../../components/CalendarComponent/CalendarComponent"
import sharedStyles from '../../styles/styles.module.css';

class CalendarContainer extends Component {
    render() {
        return (
            <div className={sharedStyles["content-container-NoNotification"]}>
             <CalendarComponent/>
            </div>
        )
    }
}

export default CalendarContainer
