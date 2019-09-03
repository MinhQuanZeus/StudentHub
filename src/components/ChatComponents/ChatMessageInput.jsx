import React, { Component } from 'react';
import './ChatMessageInput.css';

class MessageInput extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="WindowInput-container">
        <input type="text" placeholder="Type your messages" className="WindowInput-input" />
        <div className="WindowInput-send-btn">Send</div>
      </div>
    );
  }
}

export default MessageInput;
