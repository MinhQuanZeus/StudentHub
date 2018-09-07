import React from 'react';

export const LoginComponent = (props) => {
    return (
        <div className="login-form" onSubmit={props.submit}>
            <form name="loginForm">
                <label>Email: </label>
                <input type="email" name="email" onChange={props.changeEmail}/>
                <br/>
                <label>Password: </label>
                <input type="password" name="password" onChange={props.changePassword}/>
                <br/>
                <input type="submit" value="login"/>
            </form>
            <div className="message">
                {props.isLoginPending && <div>Please wait...</div>}
                {props.isLoginSuccess && <div>Success.</div>}
                {props.loginError && <div>{props.loginError.message}</div>}
            </div>
        </div>
    )
};