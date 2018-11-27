import React from 'react';
import Link from "react-router-dom/es/Link";

import {forgotPasswordConstants} from "../../constants/forgotPasswordConstants";
import {applicationMessages} from "../../constants/applicationConstants";

export const ForgotPasswordStep1Component = (props) => {

    let forgotPasswordStatus = props.forgotPasswordStatus;

    let message;
    if (forgotPasswordStatus !== undefined && forgotPasswordStatus !== null) {
        switch (forgotPasswordStatus) {
            case forgotPasswordConstants.FORGOT_PASSWORD_SUCCESS:
                message = (<div>{applicationMessages.SUCCESS}</div>);
                break;
            case forgotPasswordConstants.FORGOT_PASSWORD_PENDING:
                message = (<div>{applicationMessages.PENDING}</div>);
                break;
            default:
                message = (<div>{forgotPasswordStatus.message}</div>)
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
                                        Forgot your password?
                                    </h2>
                                    <p className="card-title m-0">
                                        Don't worry! We will help you reset your password
                                    </p>
                                </li>
                                <li className="list-group-item border-0">
                                    <div className="form-group">
                                        <label htmlFor="login_username">Username</label>
                                        <div className="input-group">
                                        <span className="input-group-addon">
                                            <i className="fa fa-user fa-2x"/>
                                        </span>
                                            <input type="email" id="login_username" name="login_username"
                                                   className="form-control" onChange={props.changeEmail}/>
                                        </div>
                                    </div>
                                </li>
                                <li className="list-group-item border-0">
                                  {message}
                                </li>
                                <li className="list-group-item border-0">
                                    <button type="submit" className="btn btn-primary login-btn">Next</button>
                                </li>
                            </ul>
                        </form>
                        <div>
                            <Link to="/login"><p className="forgot-password-paragraph">Remember your password? Login here</p></Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="login-image-container">
                <img src="images/forgot-password-illustration.svg" className="Illustration" alt=""/>
            </div>
        </div>
    )
};
