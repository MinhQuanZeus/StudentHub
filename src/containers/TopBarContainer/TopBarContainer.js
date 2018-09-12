import React, {Component} from 'react';
import {connect} from 'react-redux';
import {TopBarComponent} from "../../components/TopBarComponent/TopBarComponent";

class TopBarContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        // let {studentInformation} = this.props;
        let studentInformation;

        return (
            <TopBarComponent studentInformation={studentInformation}/>
        )
    }

}

const mapStateToProps = (state) => {
    return {
//bind student information to props here
    }
};

const mapDispatchToProps = (dispatch) => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(TopBarContainer);