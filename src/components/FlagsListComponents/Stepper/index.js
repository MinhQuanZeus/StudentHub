import React, { Fragment } from 'react';
import css from './Stepper.module.scss';

import classnames from 'classnames';

export const Step = props => {
  return (
    <div className={classnames(css.Step, props.className)}>
      <span className={css.Title}>{props.title}</span>
      <div
        className={classnames(
          css.Index,
          props.index === props.current && css.Current,
          props.index < props.current && css.Done
        )}
      >
        <div className={css.Text}>
          {props.index < props.current ? (
            <i className="fas fa-check" />
          ) : (
            props.index
          )}
        </div>
      </div>
    </div>
  );
};

export const Stepper = props => {
  const width = ((props.current - 1) * 100) / (props.children.length - 1);
  return (
    <div className={classnames(css.Stepper, props.className)}>
      <div
        className={classnames(css.Progress)}
        style={{ width: width + '%' }}
      />
      <Fragment>{props.children}</Fragment>
    </div>
  );
};
