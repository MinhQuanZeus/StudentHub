import React, {Component} from "react";
import {CalendarComponent} from "../../components/CalendarComponent/CalendarComponent"
import sharedStyles from '../../styles/styles.css';

class CalendarContainer extends Component {
    render() {
        return (
            <div className={sharedStyles["container-background"]}>
             <CalendarComponent/>
            </div>
        )
    }
}

export default CalendarContainer