import React, { Component } from 'react';
import css from './SelectedUser.m.scss';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import defaultAvatar from '../../images/img_avatar.png';

class SelectedUser extends Component {
  render() {
    const { displayValue, value, photo_url, index, onDelete } = this.props;
    return (
      <div className={css.SelectedUser}>
        <div className={css.Icons}>
          <img className={css.Avatar} src={photo_url || defaultAvatar} />
          <div
            className={css.DeleteIcon}
            onClick={() => onDelete({ value: value, displayValue: displayValue, photo_url: photo_url, index: index })}
          >
            <Icon iconName="Cancel" />
          </div>
        </div>
        <div>{displayValue}</div>
      </div>
    );
  }
}

export default SelectedUser;
