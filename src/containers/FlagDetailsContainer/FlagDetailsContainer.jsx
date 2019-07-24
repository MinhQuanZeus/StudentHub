/* global fetch */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
import Details from '../../components/FlagDetailsComponents';
import { API_END_POINT } from '../../constants/ApiUrl';
import sharedStyles from '../../styles/styles.module.css';
// import css from './FlagDetailsContainer.m.scss';
import { AppContext } from '../AppContext';
import { PrimaryButton } from 'office-ui-fabric-react';

class FlagDetailsContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mode: 'default',
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
    const { mode, details } = this.state;
    const { user } = this.context;
    return (
      <section className={sharedStyles['content-container']}>
        <HeaderComponent labels={['Flag Manager', 'Details']}>
          {details && details.created_by.id === user.id && (
            <PrimaryButton text="Edit" onClick={() => this.setState(() => ({ mode: 'edit' }))} />
          )}
        </HeaderComponent>
        {details && <Details mode={mode} {...details} onCancel={() => this.setState(() => ({ mode: 'default' }))} />}
      </section>
    );
  }
}

FlagDetailsContainer.contextType = AppContext;
FlagDetailsContainer.propTypes = {
  match: PropTypes.object,
};

export default FlagDetailsContainer;
