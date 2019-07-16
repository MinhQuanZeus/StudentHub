import React, { Component } from 'react';
import { Icon, Modal } from 'office-ui-fabric-react';
import css from './Popup.m.scss';
import classnames from 'classnames';

class Popup extends Component {
  render() {
    const { isOpen, title, onCancel, children, className } = this.props;
    return (
      <Modal className={classnames(css.Popup, className)} isDarkOverlay={true} isOpen={isOpen} isBlocking={true}>
        <div className={css.Header}>
          <div className={css.Title}>{title}</div>
          <Icon iconName="Cancel" onClick={onCancel} />
        </div>
        {children}
      </Modal>
    );
  }
}

export default Popup;
