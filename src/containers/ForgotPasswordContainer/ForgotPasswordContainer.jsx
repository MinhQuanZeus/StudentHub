import React, { Component } from 'react';
import { connect } from 'react-redux';

import { changePassword, forgotPassword } from '../../actions/ForgotPasswordActions/forgotPasswordActions';
import ForgotPasswordStep2Component from '../../components/ForgotPasswordComponent/ForgotPasswordStep2Component';
import ForgotPasswordStep3Component from '../../components/ForgotPasswordComponent/ForgotPasswordStep3Component';
import { forgotPasswordConstants } from '../../constants/forgotPasswordConstants';
import $ from 'jquery';
import { history } from '../../helpers';
import ForgotPasswordStep1Component from '../../components/ForgotPasswordComponent/ForgotPasswordStep1Component';

class ForgotPasswordContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conPasswordType: 'password',
      newPasswordType: 'password',
      step: 1,
    };
  }

  onNextStep = (index, email) => {
    this.setState({ step: index, email: email });
  };

  setToken = (token) => {
    this.setState({ token: token });
  };

  componentWillMount() {
    $('.chatBotLoading').remove();
    $('.lex-web-ui-iframe').remove();
  }

  render() {
    const { step, email, token } = this.state;
    let forgotPasswordComponent;
    switch (step) {
      case 2:
        forgotPasswordComponent = (
          <ForgotPasswordStep2Component onNextStep={this.onNextStep} setToken={this.setToken} email={email} {...this.props} />
        );
        break;
      case 3:
        forgotPasswordComponent = (
          <ForgotPasswordStep3Component
            token={token}
            submit={this.onSubmitChangePassword}
            conPasswordType={this.state.conPasswordType}
            newPasswordType={this.state.newPasswordType}
            toggleConPasswordVisibility={this.toggleConPasswordVisibility}
            toggleNewPasswordVisibility={this.toggleNewPasswordVisibility}
          />
        );
        break;
      default:
        forgotPasswordComponent = <ForgotPasswordStep1Component onNextStep={this.onNextStep} {...this.props} />;
    }
    return <div>{forgotPasswordComponent}</div>;
  }

  getCurrentStep() {
    const { state } = history.location;
    // console.log(this.props);
    // console.log(history);
    return (state && state.step) || 1;
  }

  toggleConPasswordVisibility = () => {
    this.setState((prevState) => {
      if (prevState.conPasswordType === 'password') {
        return { conPasswordType: 'text' };
      } else {
        return { conPasswordType: 'password' };
      }
    });
  };

  toggleNewPasswordVisibility = () => {
    this.setState((prevState) => {
      if (prevState.newPasswordType === 'password') {
        return { newPasswordType: 'text' };
      } else {
        return { newPasswordType: 'password' };
      }
    });
  };

  setEmail = (email) => {
    this.setState({ email: email });
  };

  setVerifyCodeToStateOnChange = (event) => {
    this.setState({ verifyCode: event.target.value });
  };

  setNewPasswordToStateOnChange = (event) => {
    this.setState({ newPassword: event.target.value });
  };

  setConfirmationPasswordToStateOnChange = (event) => {
    this.setState({ conPassword: event.target.value });
  };

  onSubmitStep1 = (e) => {
    e.preventDefault();
    const { email } = this.state;
    this.props.forgotPassword(email, forgotPasswordConstants.EMAIL_CHANNEL, null);
  };
  onSubmitStep2 = (e) => {
    e.preventDefault();
    const { email, verifyCode } = this.state;
    this.props.forgotPassword(email, forgotPasswordConstants.EMAIL_CHANNEL, verifyCode);
  };

  onSubmitChangePassword = (e) => {
    e.preventDefault();
    const { newPassword, conPassword } = this.state;
    const { state } = this.props.location;
    const token = state.x_access_token || '';
    this.props.changePassword(token, newPassword, conPassword);
  };
}

const mapStateToProps = (state) => {
  return {
    forgotPasswordStatus: state.forgotPassword.forgotPasswordStatus,
    changePasswordStatus: state.forgotPassword.changePasswordStatus,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    forgotPassword: (email, channel, verifyCode) => dispatch(forgotPassword(email, channel, verifyCode)),
    changePassword: (accessToken, newPassword, conPassword) => dispatch(changePassword(accessToken, newPassword, conPassword)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPasswordContainer);
