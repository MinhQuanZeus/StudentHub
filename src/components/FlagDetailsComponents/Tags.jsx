import React, { Component } from 'react';
import PropTypes from 'prop-types';

import css from './Tags.m.scss';
import { Persona } from 'office-ui-fabric-react';
import PersonPicker from '../PersonPicker';

class Tags extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onRemove = this.onRemove.bind(this);
  }

  onChange(o) {
    const { values } = this.props;
    const tags = values.tags;
    tags.push(o.id);

    this.props.handleChange({
      target: {
        name: 'tags',
        value: tags,
      },
    });
  }

  onRemove(o) {
    const { values } = this.props;
    const tags = values.tags.filter((id) => id !== o.id);

    this.props.handleChange({
      target: {
        name: 'tags',
        value: tags,
      },
    });
  }

  render() {
    const { mode, staffs, values } = this.props;

    const items = mode === 'default' ? this.props.items : staffs.filter((o) => values.tags.indexOf(o.id) >= 0);

    return (
      <div className={css.Tags}>
        <label>Tags</label>
        {mode === 'edit' && <PersonPicker items={staffs} values={values.tags} onChange={this.onChange} />}
        <ul>
          {items &&
            items.map((o) => (
              <li key={o.id || `${o.type}${o.user_id}`}>
                <Persona
                  text={o.name || `${o.first_name} ${o.last_name}`}
                  imageUrl={o.photo_url}
                  imageAlt={o.name || `${o.first_name} ${o.last_name}`}
                />
                {mode === 'edit' && (
                  <span onClick={() => this.onRemove(o)}>
                    <i className="fas fa-times" />
                  </span>
                )}
              </li>
            ))}
        </ul>
      </div>
    );
  }
}

Tags.propTypes = {
  mode: PropTypes.string,
  items: PropTypes.array,
  staffs: PropTypes.array,
  values: PropTypes.object,
  handleChange: PropTypes.func,
};

export default Tags;
