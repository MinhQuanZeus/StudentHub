import React from 'react';
import ReactModal from 'react-modal';
import classnames from 'classnames';

import css from './Popup.module.scss';

ReactModal.setAppElement('#root');

export const Header = props => (
  <div className={css.Header}>{props.children}</div>
);

export const Popup = props => (
  <ReactModal
    isOpen={props.isOpen}
    className={classnames(css.Popup, props.className)}
    overlayClassName={css.Overlay}
  >
    <Header>{props.title}</Header>
    {props.children}
  </ReactModal>
);
