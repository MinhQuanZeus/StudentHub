import React, { Component } from 'react';
import { connect } from 'react-redux';
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
import FlagManagerDetailsComponent from '../../components/FlagManagerDetailsComponent/FlagManagerDetailsComponent';

import * as actions from '../../actions/FlagDetailsActions/FlagDetailsActions';

import sharedStyles from '../../styles/styles.module.css';
import styles from './FlagManagerDetailsContainer.module.css';
import { AppContext } from '../AppContext';

class FlagManagerDetailsContainer extends Component {
  state = {};

  componentDidMount() {
    const token = this.context.user.x_access_token;
    const flagId = this.props.match.params.id;
    this.props.getFlagDetails(token, flagId);
  }

  render() {
    const { flagDetails } = this.props;

    if (flagDetails.loading) {
      return null;
    }

    return (
      <section className={sharedStyles['content-container']}>
        <HeaderComponent labels={['Flag Manager', 'Details']}>
          <span
            className={styles['btn-colored']}
            onClick={() => console.log('clicked')}
          >
            Edit Flag
          </span>
        </HeaderComponent>
        <FlagManagerDetailsComponent />
      </section>
    );
  }
}

FlagManagerDetailsContainer.contextType = AppContext;

function mapStateToProps(state) {
  return {
    login: state.login.loginInformation,
    flagsList: state.flagsList,
    flagDetails: state.flagDetails
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getFlagDetails: (x_access_token, flagId) =>
      dispatch(actions.getFlagDetails(x_access_token, flagId))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FlagManagerDetailsContainer);
