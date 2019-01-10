import React from 'react';
import ReactModal from 'react-modal';
import classnames from 'classnames';

import css from './Popup.module.scss';

ReactModal.setAppElement('#root');

export const Header = props => (
  <div className={css.Header}>
    <span>{props.children}</span>
    <i
      className={classnames('fas', 'fa-times', css.Times)}
      onClick={$event => props.onClick($event)}
    />
  </div>
);

export const Popup = props => (
  <ReactModal
    isOpen={props.isOpen}
    className={classnames(css.Popup, props.className)}
    overlayClassName={css.Overlay}
    onRequestClose={props.onRequestClose}
  >
    <Header onClick={props.onRequestClose}>{props.title}</Header>
    {props.children}
  </ReactModal>
);
