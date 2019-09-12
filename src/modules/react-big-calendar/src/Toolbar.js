import PropTypes from 'prop-types';
import React from 'react';
import cn from 'classnames';
import { navigate } from './utils/constants';
import './customStyles.scss';
import SelectViewMode from './SelectViewMode';
import css from './Toolbar.m.scss';
import { Icon } from 'office-ui-fabric-react';
import { Dropdown } from 'office-ui-fabric-react';

class Toolbar extends React.Component {
  state = {
    openYear: false,
    currentYear: '',
    yearOptions: [],
  };

  dropdownRef = React.createRef();

  onSetFocus = () => {
    this.setState({ openYear: !this.state.openYear });
    this.dropdownRef.current.focus(!this.state.openYear);
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

  onCloseDropdown = () => {
    this.setState({ openYear: false });
  };

  render() {
    const {
      localizer: { messages },
      label,
      date,
    } = this.props;
    const { openYear, yearOptions } = this.state;
    this.setYearList(date);
    return (
      <div className={`rbc-toolbar ${css.Toolbar}`}>
        <span className="rbc-toolbar-label">{label}</span>
        <div>
          <Dropdown
            componentRef={this.dropdownRef}
            options={yearOptions}
            onDismiss={this.onCloseDropdown}
            styles={{ dropdown: { width: 100, visibility: 'hidden', marginLeft: -70 }, callout: { margin: '15px 0 0 15px' } }}
          />
          <img
            onClick={() => this.onSetFocus()}
            src={openYear ? '/images/chevron-up.svg' : '/images/chevron-down.svg'}
            alt="Chevron Icon"
            className={css.ChevronIcon}
          />
        </div>
        <span className="rbc-btn-group">
          <button type="button" onClick={this.navigate.bind(null, navigate.TODAY)}>
            {messages.today}
          </button>
          <Icon iconName="PageLeft" onClick={this.navigate.bind(null, navigate.PREVIOUS)} />
          {/*<button*/}
          {/*  type="button"*/}
          {/*  onClick={this.navigate.bind(null, navigate.PREVIOUS)}*/}
          {/*>*/}
          {/*  {messages.previous}*/}
          {/*</button>*/}
          <Icon iconName="PageRight" onClick={this.navigate.bind(null, navigate.NEXT)} />
          {/*<button*/}
          {/*  type="button"*/}
          {/*  onClick={this.navigate.bind(null, navigate.NEXT)}*/}
          {/*>*/}
          {/*  {messages.next}*/}
          {/*</button>*/}
        </span>

        <span className={css.SelectViewMode}>{this.viewNamesGroup(messages)}</span>
      </div>
    );
  }

  navigate = (action) => {
    this.props.onNavigate(action);
  };

  view = (view) => {
    this.props.onView(view);
  };

  viewNamesGroup(messages) {
    const viewNames = this.props.views;
    const view = this.props.view;

    if (viewNames.length > 0) {
      // return viewNames.map(name => (
      //   <button
      //     type="button"
      //     key={name}
      //     className={cn({ 'rbc-active': view === name })}
      //     onClick={this.view.bind(null, name)}
      //   >
      //     {messages[name]}
      //   </button>
      // ))
      return (
        <SelectViewMode
          viewNames={viewNames}
          value={view}
          onItemSelected={(key, text) => {
            this.view(key);
            console.log(key);
          }}
        />
      );
    }
  }
}

Toolbar.propTypes = {
  view: PropTypes.string.isRequired,
  views: PropTypes.arrayOf(PropTypes.string).isRequired,
  label: PropTypes.node.isRequired,
  localizer: PropTypes.object,
  onNavigate: PropTypes.func.isRequired,
  onView: PropTypes.func.isRequired,
  date: PropTypes.object,
};

export default Toolbar;
