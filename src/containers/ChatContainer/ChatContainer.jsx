import React, { Component } from 'react';
import ChatSidebarContainer from './ChatSidebarContainer';
import ChatMessageWindowContainer from './ChatMessageWindowContainer';
import ChatDetailsContainer from './ChatDetailsContainer';
import './ChatContainer.css';

class ChatContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedGroup: null
    }
    this.chatMessageWindowContainerRef = React.createRef();
  }

  onSelectGroup = (group) => {
    this.setState({ selectedGroup: group });
    setTimeout(() => {
      this.chatMessageWindowContainerRef.current.onSelectedGroup(group);
    }, 300)
  };

  render() {
    const { selectedGroup } = this.state;
    return (
      <div className="ChatContainer">
        <ChatSidebarContainer onSelectGroup={this.onSelectGroup} />
        {
          selectedGroup && (
            <>
              <ChatMessageWindowContainer ref={this.chatMessageWindowContainerRef} />
              <ChatDetailsContainer />
            </>
          )
        }
      </div>
    );
  }
}

export default ChatContainer;
