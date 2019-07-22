/* eslint-disable react/prop-types */
import React from 'react';
import cns from 'classnames';
import css from './Priority.m.scss';

export default function Priority({ name, className }) {
  return (
    <div className={cns(className, css.Priority, name && name.toLowerCase())}>
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
  );
}
