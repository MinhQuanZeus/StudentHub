import React, { Component } from 'react';
import './AvatarSmall.css';

class AvatarSmall extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="AvatarSmall-container">
        <div className="AvatarSmall-img">{this.props.count}</div>
        <div className="AtatarSmall-status-green" />
      </div>
    );
  }
}

export default AvatarSmall;
