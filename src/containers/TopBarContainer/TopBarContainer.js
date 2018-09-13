import React, {Component} from 'react';
import {connect} from 'react-redux';

import {TopBarComponent} from "../../components/TopBarComponent/TopBarComponent";

class TopBarContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        let {loginInformation} = this.props;

        return (
            <TopBarComponent loginInformation={loginInformation}/>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        loginInformation: state.login.loginInformation
    }
};

const mapDispatchToProps = (dispatch) => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(TopBarContainer);