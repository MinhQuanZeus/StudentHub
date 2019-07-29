import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Assignee.m.scss';
import { Persona } from 'office-ui-fabric-react';
import PersonPicker from '../PersonPicker';

class Assignee extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(o) {
    this.props.handleChange({
      target: {
        name: 'assigned_to',
        value: o.id,
      },
    });
  }

  render() {
    const { mode, staffs, id, name, avatar, values } = this.props;

    return (
      <div className={css.Assignee}>
        <label>Assign To</label>
        {mode === 'default' ? (
          id && <Persona text={name} imageUrl={avatar} imageAlt={name} />
        ) : (
          <PersonPicker value={values.assigned_to} items={staffs} onChange={this.onChange} />
        )}
      </div>
    );
  }
}

Assignee.propTypes = {
  mode: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  avatar: PropTypes.string,
  values: PropTypes.object,
  staffs: PropTypes.array,
  handleChange: PropTypes.func,
};

export default Assignee;
