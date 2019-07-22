/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import Status from '../Status';
import Priority from '../Priority';
import css from './BasicInfo.m.scss';

function BasicInfo({ subject, status, priority, category_name, sub_category_name, description, created_at }) {
  return (
    <div className={css.BasicInfo}>
      <div>
        <label>Title</label>
        <div>{subject}</div>
      </div>
      <div>
        <label>Status</label>
        <Status type={status} />
      </div>
      <div>
        <label>Category</label>
        <div>{category_name}</div>
      </div>
      <div>
        <label>Sub Category</label>
        <div>{sub_category_name}</div>
      </div>
      <div>
        <label>Priority</label>
        <Priority name={priority} />
      </div>
      <div>
        <label>Dispatch Type</label>
        <div>Public</div>
      </div>
      <div>
        <label>Date Created</label>
        <div>{format(created_at, 'DD MMM YYYY')}</div>
      </div>
      <div>
        <label>Description</label>
        <div>{description}</div>
      </div>
    </div>
  );
}
BasicInfo.propTypes = {
  subject: PropTypes.string,
  status: PropTypes.string,
  priority: PropTypes.string,
  category_name: PropTypes.string,
  sub_category_name: PropTypes.string,
  description: PropTypes.string,
  created_at: PropTypes.any,
};
export default BasicInfo;
