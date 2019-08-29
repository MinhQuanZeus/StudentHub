/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import css from './Error.module.scss';

class Error extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
    };
  }

  render() {
    const { error } = this.props;
    return (
      <div>{error ? <div className={css.Error}>{error}</div> : null}</div>
    );
  }
}

export default Error;
