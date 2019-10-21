import React, { Component } from 'react';
import ChatSidebarContainer from './ChatSidebarContainer';
import ChatMessageWindowContainer from './ChatMessageWindowContainer';
import ChatDetailsContainer from './ChatDetailsContainer';
import './ChatContainer.css';

class ChatContainer extends Component {
  constructor(props) {
    super(props);
    this.chatMessageWindowContainerRef = React.createRef();
  }

  onSelectGroup = (group) => {
    this.setState({ selectedGroup: group });
    this.chatMessageWindowContainerRef.current.onSelectedGroup(group);
  };

  render() {
    return (
      <div className="ChatContainer">
        <ChatSidebarContainer onSelectGroup={this.onSelectGroup} />
        <ChatMessageWindowContainer ref={this.chatMessageWindowContainerRef} />
        <ChatDetailsContainer />
      </div>
    );
  }
}

export default ChatContainer;
