import React, { Component } from 'react';
import { connect } from 'react-redux';

import { onFetchMentors } from '../../actions/SuccessTeamActions/SuccessTeamActions';
import { MentorCardComponent } from '../../components/MentorCardComponent/MentorCardComponent';
import sharedStyles from '../../styles/styles.module.css';
import { AppContext } from '../AppContext';

class SuccessTeamContainer extends Component {
  componentDidMount() {
    let { user } = this.context;
    this.props.onFetchMentors(user.x_access_token);
    this.props.onFetchMentors(user.first_name);
  }

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
}

SuccessTeamContainer.contextType = AppContext;

const mapStateToProps = state => {
  return {
    loading: state.mentor.loading,
    mentors: state.mentor.mentors
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
