import React, { Component } from 'react';
import { connect } from 'react-redux';

import { onFetchMentors } from '../../actions/SuccessTeamActions/SuccessTeamActions';
import { MentorCardComponent } from '../../components/MentorCardComponent/MentorCardComponent';
import sharedStyles from '../../styles/styles.module.css';
import param from '../../chatBotControl/passToken.js';
import { AppContext } from '../AppContext';

class SuccessTeamContainer extends Component {
  render() {
    let mentorItems = this.props.mentors.map(mentor => {
      return <MentorCardComponent key={mentor.record_id} mentor={mentor} />;
    });
    return (
      <div className={sharedStyles['content-container']}>
        <h2 className={sharedStyles['content-heading']}>Success Team</h2>
        {mentorItems}
      </div>
    );
  }
  componentDidMount() {
    let { user } = this.context;
    this.props.onFetchMentors(user.x_access_token);
    this.props.onFetchMentors(user.first_name);

    // var chatBotscript = param.passToken(loginInformation.x_access_token)
    // document.body.appendChild(chatBotscript);
    let script = param.passToken(user.x_access_token, user.first_name);
    document.body.appendChild(script);
  }
}

SuccessTeamContainer.contextType = AppContext;

const mapStateToProps = state => {
  return {
    loading: state.mentor.loading,
    mentors: state.mentor.mentors,
    loginInformation: state.login.loginInformation
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchMentors: access_token => dispatch(onFetchMentors(access_token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SuccessTeamContainer);
