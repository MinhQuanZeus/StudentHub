import React, {Component} from 'react';
import {login} from "../../actions/LoginActions/loginActions";
import {connect} from 'react-redux';
import {LoginComponent} from "../../components/LoginComponent/LoginComponent";

class LoginContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        let {email, password} = this.state;
        let {isLoginPending, isLoginSuccess, loginError} = this.props;

        return (
            <LoginComponent submit={this.onSubmit}
                            changeEmail={this.setEmailToStateOnChange}
                            changePassword={this.setPasswordToStateOnChange}
                            isLoginPending={isLoginPending}
                            isLoginSuccess={isLoginSuccess}
                            loginError={loginError}
            />
        )
    }

    setEmailToStateOnChange = (event) => {
        this.setState({email: event.target.value});
    }

    setPasswordToStateOnChange = (event) => {
        this.setState({password: event.target.value});
    }

    onSubmit = (e) => {
        e.preventDefault();
        let {email, password} = this.state;
        this.props.login(email, password);
    };
}

const mapStateToProps = (state) => {
    return {
        isLoginPending: state.isLoginPending,
        isLoginSuccess: state.isLoginSuccess,
        loginError: state.loginError
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: (email, password) => dispatch(login(email, password))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);