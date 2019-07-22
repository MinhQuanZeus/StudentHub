import React, { Component } from 'react';
import css from './Attachment.m.scss';

class Attachment extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={css.Attachment}>
        <label>Attachment</label>
        <ul>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    );
  }
}

export default Attachment;
