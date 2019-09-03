import React, { Component } from 'react';
import './ChatMessageSent.css';

class ChatMessageSent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="ChatMessageSent-container">
        <div className="ChatMessageSent-Background">
          <div>
            <p className="ChatMessageSent-message">{this.props.message}</p>
            <span className="ChatMessageSent-timestamp">{this.props.timestamp}</span>
          </div>
          <img className="ChatMessageSent-img" />
        </div>
      </div>
    );
  }
}

export default ChatMessageSent;
