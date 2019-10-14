import React from 'react';
import css from './QuickLinkComponent.module.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export const QuickLinkComponent = (props) => {
  const { styles } = props;
  return (
    <div className={css['Quick-Link-Container']} style={styles.container}>
      <ul className={css['Quick-Link-List']}>
        <li className={css['unselected']}>
          <Link to="/milestone">EE</Link>
        </li>
        <li className={css['selected']}>
          <Link to="/class-tracker">Class Tracker</Link>
        </li>
      </ul>
    </div>
  );
};

QuickLinkComponent.defaultProps = {
  styles: {
    container: {},
  },
};

QuickLinkComponent.propTypes = {
  styles: PropTypes.object,
};
