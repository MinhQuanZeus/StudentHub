import React, { Component } from 'react';

class Priority extends Component {
  render() {
    const { priority } = this.props;

    switch (priority) {
      case 'low':
        return <span className={priority}>!</span>;
      case 'medium':
        return <span className={priority}>!!</span>;
      case 'high':
        return <span className={priority}>!!!</span>;
      default:
        return null;
    }
  }
}

export default Priority;
