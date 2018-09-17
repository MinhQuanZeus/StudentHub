import React, {Component} from 'react';
import {connect} from 'react-redux';

import {onFetchMentors} from "../../actions/SuccessTeamActions/SuccessTeamActions";
import {MentorCardComponent} from "../../components/MentorCardComponent/MentorCardComponent";
import NotificationContainer from "../NotificationContainer/NotificationContainer";

class SuccessTeamContainer extends Component {

    render() {
        let mentorItems = this.props.mentors.map((mentor) => {
            return <MentorCardComponent key={mentor.record_id} mentor={mentor}/>
        });
        return (
            <div id='success_team' className='row'>
                <div className="main">
                    {mentorItems}
                </div>
                <NotificationContainer/>
            </div>
        );
    }

    componentWillMount() {
        let {loginInformation} = this.props;
        this.props.onFetchMentors(loginInformation.x_access_token);
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.mentor.loading,
        mentors: state.mentor.mentors,
        loginInformation: state.login.loginInformation
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchMentors: (access_token) => dispatch(onFetchMentors(access_token))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SuccessTeamContainer);