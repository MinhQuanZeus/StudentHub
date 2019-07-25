import React, { Component } from 'react';
import { Icon } from 'office-ui-fabric-react';
import Person from './Person';
import css from './PersonPicker.m.scss';

class PersonPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearching: props.isSearching || false,
      items: props.items,
    };
    this.onSearch = this.onSearch.bind(this);
    this.onFocus = this.onFocus.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    if (state.items && state.items.length === 0) {
      state.items = props.items;
    }
    return state;
  }

  onSearch($event) {
    const { items } = this.props;
    const { value } = $event.target;
    if (!value || value === '') {
      this.setState(() => ({ items }));
    } else {
      this.setState(() => ({ items: items.filter((o) => o.name.includes(value)) }));
    }
  }

  onFocus() {
    this.setState(() => ({ isSearching: true }));
  }

  onChange(staff) {
    this.setState(() => ({ isSearching: false }));
    this.props.onChange(staff);
  }
  render() {
    const { isSearching } = this.state;
    let { items } = this.state;
    const { value, values } = this.props;
    let person;
    if (value && value !== '') {
      person = items.filter((o) => o.id === value)[0];
      items = items.filter((o) => o.id !== person.id);
    }

    if (values && values.length > 0) {
      items = items.filter((o) => values.indexOf(o.id) < 0);
    }

    return (
      <div className={css.PersonPicker}>
        <div className={css.Search}>
          <input
            className={isSearching ? css.Searching : null}
            name="filterText"
            value={(person && person.name) || ''}
            onChange={this.onSearch}
            placeholder="Search Person"
            onFocus={this.onFocus}
          />
          <Icon iconName="Zoom" />
        </div>
        {isSearching && (
          <ul className={isSearching ? css.Searching : null}>
            {items.map((o, idx) => (
              <Person key={idx} {...o} onClick={() => this.onChange(o)} />
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default PersonPicker;
