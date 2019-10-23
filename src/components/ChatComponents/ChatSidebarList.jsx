import React, { Component } from 'react';
import PhotoCardST from '../PhotoCardSTComponent/PhotoCardSTComponent';
import { apiConstants } from '../../constants/applicationConstants';
import { getAccessToken } from '../../helpers';

class ChatUnreadList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentGroup: {},
    };
  }

  onSelectGroup = (group) => {
    this.setState({ currentGroup: group });
    this.props.onSelectGroup(group);
  };

  render() {
    const headerStyle = {
      fontSize: '16px',
      fontWeight: '900',
      color: '#352480',
      marginLeft: '20px',
    };
    const { currentGroup } = this.state;
    const { groups } = this.props;
    return (
      <div>
        <div style={headerStyle}>{this.props.listHeaderText}</div>
        {groups &&
          groups.length > 0 &&
          groups.map((item, index) => (
            <PhotoCardST
              onSelectGroup={() => this.onSelectGroup(item)}
              key={index}
              isSelected={currentGroup.chatroom_id === item.chatroom_id}
              img="" // img filepath here
              name={item.group_name}
              message="Message Placeholder"
              timeStamp="12:00 AM"
              notificationCount="102"
            />
          ))}
        {/* <PhotoCardST*/}
        {/*  img="" // img filepath here*/}
        {/*  name="Name Placeholder"*/}
        {/*  message="Message Placeholder"*/}
        {/*  timeStamp="12:00 AM"*/}
        {/*  notificationCount="102"*/}
        {/* />*/}
        {/* <PhotoCardST />*/}
        {/* <PhotoCardST />*/}
      </div>
    );
  }
}

export default ChatUnreadList;
