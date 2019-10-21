import React, { Component } from 'react';
import ChatSidebarList from '../../components/ChatComponents/ChatSidebarList';
import CreateNewChat from '../../components/ChatComponents/CreateNewChat';
import NewChatIcon from '../../images/chat/new-chat.png';
import ChatBotIcon from '../../images/chat/chatbot.png';
import './ChatSidebarContainer.css';
import { getAccessToken } from '../../helpers';
import { apiConstants } from '../../constants/applicationConstants';

class ChatSidebarContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenCreateChat: false,
      groups: [],
    };
  }

  componentDidMount() {
    this.initialize();
  }

  createNewChat = () => {
    console.log('open');
    this.setState({ isOpenCreateChat: true });
  };

  async initialize() {
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': getAccessToken(),
        },
      };
      const response = await fetch(`${apiConstants.BACKEND_URL}chat/chat_group/attend`, options);
      const body = await response.json();
      if (body.success) {
        this.setState(() => ({ isLoading: false, groups: body.data }));
      }
    } catch (e) {
      this.setState(() => ({ isLoading: false }));
    }
  }

  onSuccess = () => {
    this.initialize();
    this.setState({ isOpenCreateChat: false });
  };

  render() {
    const { isOpenCreateChat, groups } = this.state;
    const { onSelectGroup } = this.props;
    return (
      <div className="chat-sidebar-container">
        <div className="chat-sidebar-header">
          <span className="chat-sidebar-header-text">Chat</span>
          <span className="chat-sidebar-header-btn">
            <img onClick={this.createNewChat} src={NewChatIcon} />
          </span>
        </div>
        <input type="text" className="chat-sidebar-searchbar" placeholder="Search anything..." />
        <div className="chat-sidebar-codybot">
          <img src={ChatBotIcon} className="chat-sidebar-codybot-img" />
          <p className="chat-sidebar-codybot-text">
            Hi, I am Cody<span>you can ask me everything!</span>
          </p>
        </div>
        <ChatSidebarList onSelectGroup={onSelectGroup} groups={groups} />
        <CreateNewChat isOpen={isOpenCreateChat} onCancel={() => this.setState({ isOpenCreateChat: false })} success={this.onSuccess} />
      </div>
    );
  }
}

export default ChatSidebarContainer;
