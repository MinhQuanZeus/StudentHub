import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

import css from './ModifyHistory.m.scss';
import { Persona } from 'office-ui-fabric-react';

function ModifyHistory({ logs }) {
  return (
    <div className={css.ModifyHistory}>
      <label>Modify History</label>
      <ul>
        {logs &&
          logs.map((o) => (
            <li key={o.id}>
              <Persona primaryText={o.log} secondaryText={format(o.created_at, 'DD MMM YYYY hh:mm A')} />
            </li>
          ))}
      </ul>
    </div>
  );
}

ModifyHistory.propTypes = {
  logs: PropTypes.array,
};

export default ModifyHistory;
