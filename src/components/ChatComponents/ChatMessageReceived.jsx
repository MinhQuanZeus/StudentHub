import React, { Component } from 'react';
import './ChatMessageReceived.css';

class ChatMessageReceived extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="ChatMessageReceived-container">
        <img className="ChatMessageReceived-img" />
        <div className="ChatMessageReceived-whiteBackground">
          <p className="ChatMessageReceived-name">{this.props.name}</p>
          <p className="ChatMessageReceived-message">{this.props.message}</p>
          <span className="ChatMessageReceived-timestamp">{this.props.timestamp}</span>
        </div>
      </div>
    );
  }
}

export default ChatMessageReceived;
