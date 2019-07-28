import React, { Component } from 'react';
import css from './SelectViewMode.m.scss';
import { Dropdown } from 'office-ui-fabric-react';

class SelectViewMode extends Component {
  render() {
    const { viewNames, value, onItemSelected } = this.props;
    const options =
      viewNames &&
      viewNames.length &&
      viewNames.map((obj) => ({
        key: obj,
        text: obj,
      }));
    return (
      <div className={css.SelectViewMode}>
        <Dropdown selectedKey={value || 'month'} onChange={(event, item) => onItemSelected(item.key, item.text)} options={options} />
      </div>
    );
  }
}

export default SelectViewMode;
