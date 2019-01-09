import React from 'react';
import classnames from 'classnames';
import css from './Button.module.scss';

export const Button = props => {
  return (
    <button
      className={classnames(css['btn'], props.className)}
      onClick={$event => props.onClick($event)}
    >
      {props.children}
    </button>
  );
};

export const PrimaryButton = props => {
  return (
    <Button
      {...props}
      className={classnames(css['btn-primary'], props.className)}
    >
      {props.children}
    </Button>
  );
};

export const DefaultButton = props => {
  return (
    <Button
      {...props}
      className={classnames(css['btn-default'], props.className)}
    >
      {props.children}
    </Button>
  );
};
