import React, { Component } from 'react';
import css from './SelectYear.m.scss';
import { Dropdown } from 'office-ui-fabric-react';
import PropTypes from 'prop-types';

const styles = {
  dropdown: { width: 90, visibility: 'hidden', marginLeft: -70 },
  callout: { margin: '15px 0 0 15px' },
  dropdownItem: { padding: '0 27px' },
  dropdownItemSelected: { padding: '0 27px', outline: 'none !important' },
};

class SelectYear extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpenDropdown: false,
      currentYear: '',
      yearOptions: [],
    };
    this.dropdownRef = React.createRef();
  }

  onOpenCloseDropdown = (isOpenDropdown) => {
    this.setState({ isOpenDropdown: isOpenDropdown });
    this.dropdownRef.current.focus(isOpenDropdown);
  };

  setYearList = (date) => {
    date = new Date(date);
    const year = date.getFullYear();
    if (this.state.currentYear !== year) {
      const yearOptions = [];
      for (let i = 0; i < 4; i++) {
        yearOptions.push({
          key: year + i,
          text: year + i,
        });
      }
      this.setState({
        yearOptions: yearOptions,
        currentYear: year,
      });
    }
  };

  onYearSelected = (selectedYear) => {
    if (this.state.currentYear !== selectedYear) {
      const date = this.props.date || new Date();
      date.setFullYear(selectedYear);
      this.props.onYearChanged();
    }
  };

  render() {
    const { date } = this.props;
    const { currentYear, isOpenDropdown, yearOptions } = this.state;
    this.setYearList(date);
    return (
      <div className={css.SelectYear}>
        <Dropdown
          componentRef={this.dropdownRef}
          options={yearOptions}
          onDismiss={() => this.onOpenCloseDropdown(false)}
          onChange={(event, item) => this.onYearSelected(item.key)}
          selectedKey={currentYear}
          styles={styles}
        />
        <img
          onClick={() => this.onOpenCloseDropdown(!isOpenDropdown)}
          src={isOpenDropdown ? '/images/chevron-up.svg' : '/images/chevron-down.svg'}
          alt="Chevron Icon"
          className={css.ChevronIcon}
        />
      </div>
    );
  }
}

SelectYear.propTypes = {
  date: PropTypes.object.isRequired,
  onYearChanged: PropTypes.func.isRequired,
};

export default SelectYear;
