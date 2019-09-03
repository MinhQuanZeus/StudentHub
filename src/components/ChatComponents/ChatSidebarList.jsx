import React, { Component } from 'react';
import PhotoCardST from '../PhotoCardSTComponent/PhotoCardSTComponent';

class ChatUnreadList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const headerStyle = {
      fontSize: '16px',
      fontWeight: '900',
      color: '#352480',
      marginLeft: '20px',
    };
    return (
      <div>
        <div style={headerStyle}>{this.props.listHeaderText}</div>
        <PhotoCardST
          img="" //img filepath here
          name="Name Placeholder"
          message="Message Placeholder"
          timeStamp="12:00 AM"
          notificationCount="102"
        />
        <PhotoCardST />
        <PhotoCardST />
      </div>
    );
  }
}

export default ChatUnreadList;
