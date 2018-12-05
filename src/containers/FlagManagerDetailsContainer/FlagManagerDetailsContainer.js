import React, { Component } from 'react';
import { connect } from 'react-redux';
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';

import * as actions from '../../actions/FlagDetailsActions/FlagDetailsActions';

import sharedStyles from '../../styles/styles.css';
import styles from './FlagManagerDetailsContainer.css';


class FlagManagerDetailsContainer extends Component {
  state = {

  }

  componentDidMount() {
    const token = this.props.login.x_access_token;
    const flagId = this.props.match.params.id;
    this.props.getFlagDetails(token, flagId);
  }

  render() {
    const { flagDetails } = this.props;

    if (flagDetails.loading) { return null }

    return (
      <section className={sharedStyles["content-container"]}>
        <HeaderComponent label='Flag'>
          <span className={styles['btn-colored']} onClick={() => console.log('clicked')}>
            Edit Flag
          </span>
        </HeaderComponent>
      </section>
    )
  }
}

function mapStateToProps(state) {
  return {
    login: state.login.loginInformation,
    flagsList: state.flagsList,
    flagDetails: state.flagDetails,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getFlagDetails: (x_access_token, flagId) => dispatch(actions.getFlagDetails(x_access_token, flagId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FlagManagerDetailsContainer);
