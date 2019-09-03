import React, { Component } from 'react';
import './ChatMessageWindowContainer.css';
import ChatMessageReceived from '../../components/ChatComponents/ChatMessageReceived';
import ChatMessageSent from '../../components/ChatComponents/ChatMessageSent';
import MessageInput from '../../components/ChatComponents/ChatMessageInput';
import IconInvalidName from '../../images/chat/invalid-name.png';
import { Icon } from 'office-ui-fabric-react';

class ChatMessageWindowContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="ChatMessageWindow-container">
        <div className="ChatMessageWindow-header">
          <img className="ChatMessageWindow-header-img" src={IconInvalidName} />
          <span className="ChatMessageWindow-header-title">Street Photography</span>
          <img className="ChatMessageWindow-header-phone" />
          <img className="ChatMessageWindow-header-camera" />
        </div>
        <ChatMessageReceived
          name="Name Placeholder"
          message="Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old."
          timestamp="12:00AM"
        />
        <ChatMessageSent
          name="Name Placeholder"
          message="Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old."
          timestamp="12:00AM"
        />
        <div className="ChatMessageWindow-input-container">
          <MessageInput />
        </div>
      </div>
    );
  }
}

export default ChatMessageWindowContainer;
