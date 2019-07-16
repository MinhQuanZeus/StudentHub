import React, { Component } from 'react';
import css from './Textbox.m.scss';

class Textbox extends Component {
  render() {
    const { label, onChange, value, message, diactivate, disabled, readOnly, type, labelIcon, name } = this.props;
    return (
      <div className={`form-group ${css.Textbox}`}>
        <label>
          {labelIcon && <img src={labelIcon} width="19px" height="19px" alt=""/>}
          {label}
        </label>
        {!diactivate ? (
          <input
            name={name}
            type={type || 'text'}
            className="form-control"
            value={value || ''}
            onChange={onChange}
            disabled={disabled}
            readOnly={readOnly}
          />
        ) : (
          <div>{value}</div>
        )}
        {message ? <div className="invalid-feedback">{message}</div> : null}
      </div>
    );
  }
}

export default Textbox;
