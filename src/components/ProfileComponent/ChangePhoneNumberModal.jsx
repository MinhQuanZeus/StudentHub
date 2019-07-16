import React, { Component } from 'react';
import css from './ChangePhoneNumberModal.m.scss';
import { Modal } from 'office-ui-fabric-react';
import CancelIcon from '../../images/combined-shape.svg';
import ChangePhoneNumberStep1 from './ChangePhoneNumberStep1';
import ChangePhoneNumberStep2 from './ChangePhoneNumberStep2';
import ChangePhoneNumberStep3 from './ChangePhoneNumberStep3';

class ChangePhoneNumberModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 1,
    };
  }

  getStep = () => {
    const { currentStep } = this.state;

    switch (currentStep) {
      case 2:
        return <ChangePhoneNumberStep2 />;
      case 3:
        return <ChangePhoneNumberStep3 />;
      default:
        return <ChangePhoneNumberStep1 />;
    }
  };

  onCancel = () => {
    this.setState({ currentStep: 1 });
    this.props.onCancel();
  };

  render() {
    const { isOpen } = this.props;
    return (
      <Modal className={css.ChangePhoneNumberModal} isDarkOverlay={true} isOpen={isOpen} isBlocking={true}>
        <div className={css.Header}>
          <span>Change Phone Number</span>
          <img onClick={this.onCancel} src={CancelIcon} alt="image"/>
        </div>
        {this.getStep()}
      </Modal>
    );
  }
}

export default ChangePhoneNumberModal;
