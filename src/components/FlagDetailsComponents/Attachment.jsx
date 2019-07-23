import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Attachment.m.scss';

class Attachment extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { items } = this.props;
    return (
      <div className={css.Attachment}>
        <label>Attachment</label>
        <ul>{items && items.map((o) => <li key={o.id}></li>)}</ul>
      </div>
    );
  }
}

Attachment.propTypes = {
  items: PropTypes.array,
};

export default Attachment;
