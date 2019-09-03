import React, { Component } from 'react';
import AvatarSmall from '../../components/AvatarSmall/AvatarSmall';
import Appointment from '../../components/AppointmentComponent/Appointment';
import './ChatDetailsContainer.css';
import IconGroup from '../../images/chat/icon-group.png';
import IconAppointment from '../../images/chat/icon-appointment.png';
import IconAttachment from '../../images/chat/icon-attachment.png';
import NewAppointment from '../../images/chat/new-appointment.png';

class ChatDetailsContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="ChatDetails-container">
        <div className="ChatDetails-group-container">
          <p className="ChatDetails-header">
            <img src={IconGroup} />
            Group
          </p>
          <div className="ChatDetails-group-avatar-container">
            <AvatarSmall />
            <AvatarSmall />
            <AvatarSmall />
            <AvatarSmall />
            <AvatarSmall />
            <AvatarSmall />
            <AvatarSmall count="+8" />
            <div className="ChatDetails-group-btn">+ Add Person</div>
          </div>
        </div>
        <div className="ChatDetails-appointment-container">
          <p className="ChatDetails-header">
            <img src={IconAppointment} />
            Next Appointment
            <img className="ChateDetails-newAppointment" src={NewAppointment} />
          </p>
          <Appointment date="Sep 20" title="Placeholder title" time="12:00AM" />
          <Appointment date="Sep 20" title="Placeholder title" time="12:00AM" />
          <Appointment date="Sep 20" title="Placeholder title" time="12:00AM" />
        </div>
        <div className="ChatDetails-search-container">
          <p className="ChatDetails-header">Search in This Chat</p>
          <input type="text" className="ChatDetails-search" placeholder="Search anything..." />
        </div>
        <div className="ChatDetails-attachment-container">
          <p className="ChatDetails-header">
            <img src={IconAttachment} />
            Attachment
          </p>
          <div className="ChatDetails-filter-container">
            <div className="ChatDetails-filter-btn">
              <img />
              <div className="ChatDetails-filter-btn-label">URL</div>
            </div>
            <div className="ChatDetails-filter-btn">
              <img />
              <div className="ChatDetails-filter-btn-label">Files</div>
            </div>
            <div className="ChatDetails-filter-btn">
              <img />
              <div className="ChatDetails-filter-btn-label">Pictures</div>
            </div>
            <div className="ChatDetails-filter-btn">
              <img />
              <div className="ChatDetails-filter-btn-label">Videos</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ChatDetailsContainer;
