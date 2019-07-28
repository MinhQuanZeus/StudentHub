import PropTypes from 'prop-types';
import React from 'react';
import cn from 'classnames';
import { navigate } from './utils/constants';
import './customStyles.scss';
import SelectViewMode from './SelectViewMode';
import css from './Toolbar.m.scss';
import { Icon } from 'office-ui-fabric-react';

class Toolbar extends React.Component {
  render() {
    const {
      localizer: { messages },
      label,
    } = this.props;

    return (
      <div className={`rbc-toolbar ${css.Toolbar}`}>
        <span className="rbc-toolbar-label">{label}</span>
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
};

export default Toolbar;
