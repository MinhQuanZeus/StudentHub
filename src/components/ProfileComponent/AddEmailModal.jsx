import React, { Component } from 'react';
import css from './AddEmailModal.m.scss';
import { Modal } from 'office-ui-fabric-react';
import CancelIcon from '../../images/combined-shape.svg';
import AddEmailStep1 from './AddEmailStep1';
import AddEmailStep2 from './AddEmailStep2';
import AddEmailStep3 from './AddEmailStep3';

class AddEmailModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 1,
      email: '',
    };
  }

  getStep = () => {
    const { currentStep, email } = this.state;

    switch (currentStep) {
      case 2:
        return <AddEmailStep2 email={email} onSuccess={(email) => this.setState({ currentStep: 3, email: email })} />;
      case 3:
        return <AddEmailStep3 email={email} onSuccess={this.onCancel} />;
      default:
        return <AddEmailStep1 onSuccess={(email) => this.setState({ currentStep: 2, email: email })} />;
    }
  };

  onCancel = () => {
    this.setState({ currentStep: 1 });
    this.props.onCancel();
  };

  render() {
    const { isOpen } = this.props;
    return (
      <Modal className={css.AddEmailModal} isDarkOverlay={true} isOpen={isOpen} isBlocking={true}>
        <div className={css.Header}>
          <span>Add Email Address</span>
          <img onClick={this.onCancel} src={CancelIcon} />
        </div>
        {this.getStep()}
      </Modal>
    );
  }
}

export default AddEmailModal;
