import React, { Component } from 'react';
import css from './UserCheckbox.m.scss';
import defaultAvatar from '../../images/img_avatar.png';

class UserCheckbox extends Component {
  render() {
    const { displayValue, value, onChange, checked, photo_url, index, email } = this.props;
    return (
      <label className={css.UserCheckbox}>
        {displayValue}
        <img src={photo_url || defaultAvatar} alt="avatar" />
        <input
          type="checkbox"
          name={value}
          checked={checked}
          onChange={() => {}}
          onClick={() => {
            onChange({ value: value, displayValue: displayValue, checked: !checked, photo_url: photo_url, index: index, email: email });
          }}
        />
        <span className={css.checkmark} />
      </label>
    );
  }
}

export default UserCheckbox;
