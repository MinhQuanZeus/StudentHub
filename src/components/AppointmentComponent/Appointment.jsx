import React, { Component } from 'react';
import ShapePhone from '../../images/chat/shape-phone.png';
import ShapeMessage from '../../images/chat/shape-message.png';
import ShapeCamera from '../../images/chat/shape-camera.png';
import './Appointment.css';

class Appointment extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Appointment-container">
        <div className="Appointment-left">
          <img src={ShapeMessage} className="Appointment-left-img" />
          <div className="Appointment-left-date">{this.props.date}</div>
        </div>
        <div className="Appointment-right">
          <div className="Appointment-right-title">{this.props.title}</div>
          <div className="Appointment-right-time">{this.props.time}</div>
        </div>
      </div>
    );
  }
}
export default Appointment;
