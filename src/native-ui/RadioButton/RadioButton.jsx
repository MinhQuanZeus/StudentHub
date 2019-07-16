import React, { Component } from 'react';
import css from './RadioButton.m.scss';

class RadioButton extends Component {
  render() {
    const { options, value, label, name, onItemSelected, disabled } = this.props;
    return (
      <div className={`${css.RadioButton} form-group`}>
        <label>{label}</label>
        <div>
          {options &&
            options.length > 0 &&
            options.map((obj, idx) => (
              <label key={idx} className={css.radio}>
                {obj.displayValue}
                <input
                  checked={value === obj.value}
                  type="radio"
                  name={name}
                  disabled={disabled}
                  onChange={() => onItemSelected(obj.value, obj.displayValue)}
                  value={obj.value}
                />
                <span className={css.checkround} />
              </label>
            ))}
        </div>
      </div>
    );
  }
}

export default RadioButton;
