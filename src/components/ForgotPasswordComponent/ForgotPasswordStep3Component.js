import React from 'react';
import {forgotPasswordConstants} from "../../constants/forgotPasswordConstants";

export const ForgotPasswordStep3Component = (props) => {

    let changePasswordStatus = props.changePasswordStatus;

    let message;
    if (changePasswordStatus !== undefined && changePasswordStatus !== null) {
        switch (changePasswordStatus) {
            case forgotPasswordConstants.CHANGE_PASSWORD_SUCCESS:
                message = (<div>Success</div>);
                break;
            case forgotPasswordConstants.CHANGE_PASSWORD_PENDING:
                message = (<div>Please wait...</div>);
                break;
            default:
                message = (<div>{changePasswordStatus.message}</div>)
        }
    }

    return (
        <div className="container" onSubmit={props.submit}>
            <div className="login-form-container">
                <div className="inner-form-container">
                    <div className="success-hub-title">
                        <img src="images/shape.svg" className="Shape" alt=""/>
                        <span className="success-brand">Success</span><span className="hub-brand">Hub</span>
                    </div>
                    <div className="login-form">
                        <form id="form_login" noValidate="novalidate">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item border-0">
                                    <h2 className="card-title m-0">
                                        Enter your New Password
                                    </h2>
                                    <p className="card-title m-0">
                                        Type new password for your account
                                    </p>
                                </li>
                                <li className="list-group-item border-0">
                                    <div className="form-group">
                                        <label htmlFor="login_username">Password</label>
                                        <div className="input-group">
                                        <span className="input-group-addon">
                                            <i className="fa fa-key fa-2x"/>
                                        </span>
                                            <input type="password" id="login_username" name="login_username"
                                                   className="form-control" onChange={props.changeNewPassword}/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="login_password">Confirm Password</label>
                                        <div className="input-group">
                                        <span className="input-group-addon">
                                            <i className="fa fa-key fa-2x"/>
                                        </span>
                                            <input type="password" id="login_password" name="login_password"
                                                   className="form-control" onChange={props.changeConPassowrd}/>
                                        </div>
                                    </div>
                                </li>
                                <li className="list-group-item border-0">
                                    <button type="submit" className="btn btn-primary login-btn">Next</button>
                                </li>
                            </ul>
                        </form>
                    </div>
                </div>
            </div>
            <div className="login-image-container">
                <img src="images/forgot-password-illustration.svg" className="Illustration" alt=""/>
            </div>
            <div className="message">
                {message}
            </div>
        </div>
    )
};