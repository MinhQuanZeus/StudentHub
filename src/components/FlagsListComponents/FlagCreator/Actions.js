import React from 'react';
import { DefaultButton, PrimaryButton } from '../../Button';
import css from './Actions.module.scss';

const Actions = props => {
  return (
    <div className={css.Actions}>
      {props.current > 1 && (
        <DefaultButton onClick={props.onPrevious} className={css.Previous}>
          Previous
        </DefaultButton>
      )}
      <PrimaryButton onClick={props.onNext} className={css.Next}>
        Next
      </PrimaryButton>
    </div>
  );
};

export default Actions;
