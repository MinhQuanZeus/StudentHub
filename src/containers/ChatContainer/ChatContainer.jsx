import React, { Component } from 'react';
import ChatSidebarContainer from './ChatSidebarContainer';
import ChatMessageWindowContainer from './ChatMessageWindowContainer';
import ChatDetailsContainer from './ChatDetailsContainer';
import './ChatContainer.css';

class ChatContainer extends Component {
  render() {
    return (
      <div className="ChatContainer">
        <ChatSidebarContainer />
        <ChatMessageWindowContainer />
        <ChatDetailsContainer />
      </div>
    );
  }
}

export default ChatContainer;
