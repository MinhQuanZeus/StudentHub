import React from 'react';
import PropTypes from 'prop-types';
import css from './Status.m.scss';
import cns from 'classnames';

function Status({ type }) {
  return <div className={cns(css.Status, type && type.toLowerCase())}>{type}</div>;
}

Status.propTypes = {
  type: PropTypes.string,
};

export default Status;
