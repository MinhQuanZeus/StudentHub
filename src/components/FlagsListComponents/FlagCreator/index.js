import React, { Component } from 'react';
import { Popup } from '../Popup';
// import ReactModal from 'react-modal';
// import classnames from 'classnames';
// import FlagNewTask1 from '../FlagNewTask/FlagNewTask1';
import { Stepper, Step } from '../Stepper';
import { DefaultButton, PrimaryButton } from '../../Button';
import css from './FlagCreator.module.scss';
console.log(css);
export class FlagCreator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 1
    };
    this.previous = this.previous.bind(this);
    this.next = this.next.bind(this);
  }

  previous($event) {
    this.setState(state => ({
      currentStep: state.currentStep > 1 ? state.currentStep - 1 : 1
    }));
  }

  next($event) {
    this.setState(state => ({
      currentStep: state.currentStep < 4 ? state.currentStep + 1 : 4
    }));
  }

  render() {
    const { props, state } = this;
    return (
      <Popup
        title="Create New Flag"
        isOpen={props.isOpen}
        className={css.FlagCreator}
      >
        <Stepper className={css.Stepper} current={state.currentStep}>
          <Step
            index={1}
            title="Info"
            className={css.Step1}
            current={this.state.currentStep}
          />
          <Step
            index={2}
            title="Details"
            className={css.Step2}
            current={this.state.currentStep}
          />
          <Step
            index={3}
            title="Assign"
            className={css.Step3}
            current={this.state.currentStep}
          />
          <Step
            index={4}
            title="Receiver"
            className={css.Step4}
            current={this.state.currentStep}
          />
        </Stepper>
        {/* <FlagNewTask1 /> */}
        <div className={css.Actions}>
          {state.currentStep > 1 && (
            <DefaultButton onClick={this.previous} className={css.Previous}>
              Previous
            </DefaultButton>
          )}
          <PrimaryButton onClick={this.next} className={css.Next}>
            Next
          </PrimaryButton>
        </div>
      </Popup>
    );
  }
}
