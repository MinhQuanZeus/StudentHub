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
      staffs: [],
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
    const responses = await Promise.all([
      fetch(`${API_END_POINT}student/flag/detail/${id}`, options),
      fetch(`${API_END_POINT}student/flag_category`, options),
      fetch(`${API_END_POINT}student/get_staffs`, options),
    ]);
    const bodies = await Promise.all(responses.map((response) => response.json()));

    this.setState(() => ({
      isLoading: false,
      details: bodies[0].success ? bodies[0].data : null,
      categories: bodies[1].success ? bodies[1].data : [],
      staffs: bodies[2].data,
    }));
  }

  componentDidMount() {
    this.initialize();
  }

  getAfterResponse = () =>{
    this.setState(() => ({ mode: 'default' }));
    this.initialize();
  }

  render() {
    const { mode, details, categories, staffs } = this.state;
    const { user } = this.context;
    return (
      <section className={sharedStyles['content-container']}>
        <HeaderComponent labels={['Flag Manager', 'Details']}>
          {details && details.created_by.id === user.id && (
            <PrimaryButton text="Edit" onClick={() => this.setState(() => ({ mode: 'edit' }))} />
          )}
        </HeaderComponent>
        {details && (
          <Details
            mode={mode}
            staffs={staffs}
            categories={categories}
            {...details}
            onCancel={() => this.getAfterResponse()}
          />
        )}
      </section>
    );
  }
}

FlagDetailsContainer.contextType = AppContext;
FlagDetailsContainer.propTypes = {
  match: PropTypes.object,
};

export default FlagDetailsContainer;
