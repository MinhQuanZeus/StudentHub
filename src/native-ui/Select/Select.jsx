import React, { Component } from 'react';
import css from './Select.m.scss';
import { Dropdown } from 'office-ui-fabric-react';

class Select extends Component {
  render() {
    const { options, value, label, onItemSelected, placeholder } = this.props;
    const optionsSelect =
      options && options.length > 0
        ? options.map((obj) => {
            return {
              key: obj.value,
              text: obj.displayValue,
            };
          })
        : [];
    return (
      <div className={`${css.Select} form-group`}>
        <label>{label}</label>
        <Dropdown
          selectedKey={value || undefined}
          onChange={(event, item) => onItemSelected(item.key, item.text)}
          placeholder={placeholder}
          options={optionsSelect}
        />
      </div>
    );
  }
}

export default Select;
