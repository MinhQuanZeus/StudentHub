/* eslint-disable react/prop-types */
import React from 'react';
import Priority from '../../Priority';
import css from './PendingFlag.m.scss';

function PendingFlag({ id, subject, priority }) {
  return (
    <section className={css['pending-flag-container']}>
      <div className={css['pending-flag-top']}>
        <p>{id}</p>
      </div>
      <div className={css['pending-flag-bottom']}>
        <p>{subject}</p>
        <Priority className={css.Priority} name={priority} />
      </div>
    </section>
  );
}

export default PendingFlag;
