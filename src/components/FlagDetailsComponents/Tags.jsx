import React, { Component } from 'react';
import PropTypes from 'prop-types';

import css from './Tags.m.scss';
import { Persona } from 'office-ui-fabric-react';

class Tags extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { items } = this.props;
    return (
      <div className={css.Tags}>
        <label>Tags</label>
        <ul>
          {items.map((o) => (
            <li key={o.id}>
              <Persona text={o.full_name} imageUrl={o.photo_url} imageAlt={o.full_name} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

Tags.propTypes = {
  items: PropTypes.array,
};

export default Tags;
