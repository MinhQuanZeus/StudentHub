import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Assignee.m.scss';
import { Persona } from 'office-ui-fabric-react';

class Assignee extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { id, name, avatar } = this.props;
    return (
      <div className={css.Assignee}>
        <label>Assign To</label>
        {id && <Persona text={name} imageUrl={avatar} imageAlt={name} />}
      </div>
    );
  }
}

Assignee.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  avatar: PropTypes.string,
};

export default Assignee;
