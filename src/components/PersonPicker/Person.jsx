import React from 'react';
import cns from 'classnames';
import css from './Person.m.scss';

const Person = (props) => (
  <li className={css.Person} onClick={props.onClick}>
    <img src={props.avatarUrl} alt="avatar" />
    <span className={cns(css.Status, props.active && css.Active)} />
    <span className={css.FullName}>{props.name}</span>
  </li>
);

export default Person;
