import React, { Component } from 'react';
import ChatSidebarList from '../../components/ChatComponents/ChatSidebarList';
import NewChatIcon from '../../images/chat/new-chat.png';
import ChatBotIcon from '../../images/chat/chatbot.png';
import './ChatSidebarContainer.css';

class ChatSidebarContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="chat-sidebar-container">
        <div className="chat-sidebar-header">
          <span className="chat-sidebar-header-text">Chat</span>
          <span className="chat-sidebar-header-btn">
            <img src={NewChatIcon} />
          </span>
        </div>
        <input type="text" className="chat-sidebar-searchbar" placeholder="Search anything..." />
        <div className="chat-sidebar-codybot">
          <img src={ChatBotIcon} className="chat-sidebar-codybot-img" />
          <p className="chat-sidebar-codybot-text">
            Hi, I am Cody<span>you can ask me everything!</span>
          </p>
        </div>
        <ChatSidebarList listHeaderText="Unread" />
      </div>
    );
  }
}

export default ChatSidebarContainer;
