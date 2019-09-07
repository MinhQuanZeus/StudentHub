/* eslint-disable camelcase */
import React, { Component } from 'react';
import { Dropdown, TextField, ChoiceGroup } from 'office-ui-fabric-react';
import cns from 'classnames';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import Status from '../Status';
import Priority from '../Priority';
import css from './BasicInfo.m.scss';

class BasicInfo extends Component {
  render() {
    const {
      mode,
      subject,
      category,
      status,
      priority,
      sub_category,
      is_public,
      description,
      created_at,
      values,
      handleChange,
      categories,
      setFieldValue,
    } = this.props;
    return (
      <div className={cns(css.BasicInfo, mode)}>
        <div>
          <label>Title</label>
          <div>{mode === 'default' ? subject : <TextField name="subject" value={values.subject} onChange={handleChange} />}</div>
        </div>
        {mode === 'default' && (
          <div>
            <label>Status</label>
            <Status type={status} />
          </div>
        )}
        <div>
          <label>Category</label>
          <div>
            {mode === 'default' ? (
              category && category.name
            ) : (
              <Dropdown
                name="category"
                defaultSelectedKey={values.category}
                options={categories.map((o) => ({ key: o.id, text: o.category_name }))}
                onChange={(event, item) => setFieldValue('category', item.key, item.text)}
              />
            )}
          </div>
        </div>
        <div>
          <label>Sub Category</label>
          <div>{mode === 'default' ? sub_category && sub_category.name : <Dropdown defaultSelectedKey={values.sub_category} />}</div>
        </div>
        <div>
          <label>Priority</label>

          <div>
            {mode === 'default' ? (
              <Priority name={priority} />
            ) : (
              <Dropdown
                name="priority"
                defaultSelectedKey={values.priority}
                options={[{ key: 'LOW', text: 'Low' }, { key: 'MEDIUM', text: 'Medium' }, { key: 'HIGH', text: 'High' }]}
                onChange={(event, item) => setFieldValue('priority', item.key, item.text)}
              />
            )}
          </div>
        </div>
        <div>
          <label>Dispatch Type</label>
          <div>
            {mode === 'default' ? (
              is_public ? (
                'Public'
              ) : (
                'Private'
              )
            ) : (
              <ChoiceGroup
                name="is_public"
                defaultSelectedKey={values.is_public}
                options={[
                  {
                    key: '1',
                    text: 'Public',
                  },
                  {
                    key: '0',
                    text: 'Private',
                  },
                ]}
                onChange={(event, item) => setFieldValue('is_public', item.key, item.text)}
              />
            )}
          </div>
        </div>
        {mode === 'default' && (
          <div>
            <label>Date Created</label>
            <div>{format(created_at, 'DD MMM YYYY')}</div>
          </div>
        )}
        <div>
          <label>Description</label>
          <div>
            {mode === 'default' ? (
              description
            ) : (
              <TextField name="description" value={values.description} onChange={handleChange} multiline />
            )}
          </div>
        </div>
      </div>
    );
  }
}
BasicInfo.propTypes = {
  mode: PropTypes.string,
  subject: PropTypes.string,
  category: PropTypes.object,
  sub_category: PropTypes.object,
  status: PropTypes.string,
  priority: PropTypes.string,
  is_public: PropTypes.bool,
  category_name: PropTypes.string,
  sub_category_name: PropTypes.string,
  description: PropTypes.string,
  created_at: PropTypes.any,
  values: PropTypes.object,
  handleChange: PropTypes.func,
  categories: PropTypes.array,
  setFieldValue: PropTypes.func,
};

export default BasicInfo;
