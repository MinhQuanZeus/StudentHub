import React, { Component } from 'react';
import css from './UserSelector.m.scss';
import UserCheckbox from './UserCheckbox';

class UserSelector extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { dataSource, handleChange } = this.props;
    return (
      <div className={css.UserSelector}>
        {dataSource &&
          dataSource.length > 0 &&
          dataSource.map((item, index) => (
            <div key={index}>
              <UserCheckbox {...item} index={index} onChange={handleChange} />
            </div>
          ))}
      </div>
    );
  }
}

export default UserSelector;
