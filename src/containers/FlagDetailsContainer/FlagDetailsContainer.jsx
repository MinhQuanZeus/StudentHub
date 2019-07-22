/* global fetch */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
import FlagDetailsComponent from '../../components/FlagDetailsComponent';
import { API_END_POINT } from '../../constants/ApiUrl';
import sharedStyles from '../../styles/styles.module.css';
import css from './FlagDetailsContainer.m.scss';
import { AppContext } from '../AppContext';

class FlagDetailsContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      details: null,
    };
  }

  async initialize() {
    const { id } = this.props.match.params;
    // eslint-disable-next-line camelcase
    const { x_access_token } = this.context.user;
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': x_access_token,
      },
    };
    const response = await fetch(`${API_END_POINT}student/flag/detail/${id}`, options);
    const body = await response.json();
    this.setState(() => ({
      isLoading: false,
      details: body.success ? body.data : null,
    }));
  }

  componentDidMount() {
    this.initialize();
  }

  render() {
    const { details } = this.state;
    return (
      <section className={sharedStyles['content-container']}>
        <HeaderComponent labels={['Flag Manager', 'Details']}>
          <span className={css['btn-colored']} onClick={() => console.log('clicked')}>
            Edit Flag
          </span>
        </HeaderComponent>
        <FlagDetailsComponent {...details} />
      </section>
    );
  }
}

FlagDetailsContainer.contextType = AppContext;
FlagDetailsContainer.propTypes = {
  match: PropTypes.object,
};

export default FlagDetailsContainer;
