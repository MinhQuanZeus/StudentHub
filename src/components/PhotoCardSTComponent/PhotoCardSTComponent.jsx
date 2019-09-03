import React, { Component } from 'react';
import './PhotoCardSTComponent.css';
import IconInvalidName from '../../images/chat/invalid-name.png';

class PhotoCardST extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="PhotoCardST-container">
        <img src={IconInvalidName} />
        <div className="PhotoCardST-text-container">
          <p className="PhotoCardST-text-name">{this.props.name}</p>
          <p className="PhotoCardST-text-message">{this.props.message}</p>
        </div>
        <div>
          <p className="PhotoCardST-text-timestamp">{this.props.timeStamp}</p>
          <span className="PhotocardST-text-notificationCount">{this.props.notificationCount}</span>
        </div>
      </div>
    );
  }
}

export default PhotoCardST;
