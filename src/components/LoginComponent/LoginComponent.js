import React from 'react';
import Link from "react-router-dom/es/Link";

import {loginStatusConstant} from "../../constants/loginStatusConstants";

export const LoginComponent = (props) => {

    let loginStatus = props.loginStatus;

    let loginMessage;
    if (loginStatus !== undefined && loginStatus !== null) {
        switch (loginStatus) {
            case loginStatusConstant.LOGIN_SUCCESS:
                loginMessage = (<div>Success</div>);
                break;
            case loginStatusConstant.LOGIN_PENDING:
                loginMessage = (<div>Please wait...</div>);
                break;
            default:
                if (loginStatus.message !== undefined && loginStatus.message !== null && loginStatus.message !== "") {
                    loginMessage = (<div>{loginStatus.message}</div>)
                } else {
                    loginMessage = (<div>Login failed!</div>)
                }

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
                                        Welcome back!
                                    </h2>
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
                                    <div className="form-group">
                                        <label htmlFor="login_password">Password</label>
                                        <div className="input-group">
                                        <span className="input-group-addon">
                                            <i className="fa fa-key fa-2x"/>
                                        </span>
                                            <input type="password" id="login_password" name="login_password"
                                                   className="form-control" onChange={props.changePassword}/>
                                        </div>
                                    </div>
                                    <label className="custom-control custom-checkbox">
                                        <input type="checkbox" id="login_remember"
                                               className="custom-control-input"/>
                                        <span className="custom-control-indicator"/>
                                        <span className="custom-control-description">Keep me logged in</span>
                                    </label>
                                </li>
                                <li className="list-group-item border-0">
                                  {loginMessage}
                                </li>
                                <li className="list-group-item border-0">
                                    <button type="submit" className="btn btn-primary login-btn">Login</button>
                                </li>
                            </ul>
                        </form>
                        <div>
                            <Link to="/forgot-password?step=1"><p className="forgot-password-paragraph">Forgot Password
                                ?</p></Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="login-image-container">
                <img src="images/login-illustration.svg" className="Illustration" alt=""/>
            </div>
        </div>
    )
};
