import React, {Component} from 'react';
import {Redirect, Route} from 'react-router-dom';
import {connect} from 'react-redux';

import {loginStatusConstant} from "../../constants/loginStatusConstants";

class PrivateRoute extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const {component, ...rest} = this.props;
        return (
            <Route {...rest} render={props => (
                this.isAuthenticated() ? (
                    React.createElement(component, props)
                ) : (
                    <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
                )
            )}/>
        )
    }

    isAuthenticated = () => {
        let {loginStatus} = this.props;
        return loginStatus === loginStatusConstant.LOGIN_SUCCESS;
    }

}

const mapStateToProps = (state) => {
    return {
        loginStatus: state.login.loginStatus
    }
};

export default connect(mapStateToProps)(PrivateRoute);