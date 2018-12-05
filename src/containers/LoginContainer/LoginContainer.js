import React, {Component} from 'react';
import {connect} from 'react-redux';

import {login} from "../../actions/LoginActions/loginActions";
import {LoginComponent} from "../../components/LoginComponent/LoginComponent";
import $ from 'jquery';

class LoginContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let {loginStatus} = this.props;
        return (
            <LoginComponent submit={this.onSubmit}
                            changeEmail={this.setEmailToStateOnChange}
                            changePassword={this.setPasswordToStateOnChange}
                            loginStatus={loginStatus}
            />
        )
    }
    componentWillMount() {
            $('.chatBotLoading').remove()
            $('.lex-web-ui-iframe').remove()
        }  
     
    setEmailToStateOnChange = (event) => {
        this.setState({email: event.target.value});
    };

    setPasswordToStateOnChange = (event) => {
        this.setState({password: event.target.value});
    };

    onSubmit = (e) => {
        e.preventDefault();
        let {email, password} = this.state;
        this.props.login(email, password);
    };
}

const mapStateToProps = (state) => {
    return {
        loginStatus: state.login.loginStatus
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: (email, password) => dispatch(login(email, password))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);