import React, {Component} from 'react';
import {connect} from 'react-redux';
import queryString from 'query-string';

import {forgotPassword, changePassword} from "../../actions/ForgotPasswordActions/forgotPasswordActions";
import {ForgotPasswordStep1Component} from "../../components/ForgotPasswordComponent/ForgotPasswordStep1Component";
import {ForgotPasswordStep2Component} from "../../components/ForgotPasswordComponent/ForgotPasswordStep2Component";
import {ForgotPasswordStep3Component} from "../../components/ForgotPasswordComponent/ForgotPasswordStep3Component";
import {forgotPasswordConstants} from "../../constants/forgotPasswordConstants";


class ForgotPasswordContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let {forgotPasswordStatus, changePasswordStatus} = this.props;
        let forgotPasswordComponent;
        switch (this.getCurrentStep()) {
            case "2":
                forgotPasswordComponent = (
                    <ForgotPasswordStep2Component submit={this.onSubmitStep2}
                                                  changeVerifyCode={this.setVerifyCodeToStateOnChange}
                                                  forgotPasswordStatus={forgotPasswordStatus}
                    />
                );
                break;
            case "3":
                forgotPasswordComponent = (
                    <ForgotPasswordStep3Component submit={this.onSubmitChangePassword}
                                                  changeNewPassword={this.setNewPasswordToStateOnChange}
                                                  changeConPassowrd={this.setConfirmationPasswordToStateOnChange}
                                                  changePasswordStatus={changePasswordStatus}
                    />
                );
                break;
            default:
                forgotPasswordComponent = (
                    <ForgotPasswordStep1Component submit={this.onSubmitStep1}
                                                  changeEmail={this.setEmailToStateOnChange}
                                                  forgotPasswordStatus={forgotPasswordStatus}
                    />
                );
        }
        return (
            <div>{forgotPasswordComponent}</div>
        )
    }

    getCurrentStep = () => {
        const values = queryString.parse(this.props.history.location.search);
        if (values.step === undefined || values.step === null) {
            return 1;
        } else {
            return values.step;
        }
    };

    setEmailToStateOnChange = (event) => {
        this.setState({email: event.target.value})
    };

    setVerifyCodeToStateOnChange = (event) => {
        this.setState({verifyCode: event.target.value})
    };

    setNewPasswordToStateOnChange = (event) => {
        this.setState({newPassword: event.target.value})
    };

    setConfirmationPasswordToStateOnChange = (event) => {
        this.setState({conPassword: event.target.value})
    };

    onSubmitStep1 = (e) => {
        e.preventDefault();
        let {email} = this.state;
        this.props.forgotPassword(email, forgotPasswordConstants.EMAIL_CHANNEL, null);
    };
    onSubmitStep2 = (e) => {
        e.preventDefault();
        let {email, verifyCode} = this.state;
        this.props.forgotPassword(email, forgotPasswordConstants.EMAIL_CHANNEL, verifyCode);
    };

    onSubmitChangePassword = (e) => {
        e.preventDefault();
        let {newPassword, conPassword} = this.state;
        let accessToken = this.props.location.state.access_token;
        if (newPassword === conPassword) {
            this.props.changePassword(accessToken, newPassword)
        } else {
            this.setState({changePasswordStatus: "newPassword and conPassword must be the same"})
        }
    }

}

const mapStateToProps = (state) => {
    return {
        forgotPasswordStatus: state.forgotPassword.forgotPasswordStatus,
        changePasswordStatus: state.forgotPassword.changePasswordStatus
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        forgotPassword: (email, channel, verifyCode) => dispatch(forgotPassword(email, channel, verifyCode)),
        changePassword: (accessToken, newPassword) => dispatch(changePassword(accessToken, newPassword))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordContainer);