/* eslint-disable camelcase */
/* global fetch */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import BasicInfo from './BasicInfo';
import Assignee from './Assignee';
import Tags from './Tags';
import css from './Details.m.scss';
import Attachment from './Attachment';
import ModifyHistory from './ModifyHistory';
import Comments from './Comments';
import AdminDetails from './AdminDetails';
import { AppContext } from '../../containers/AppContext';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react';
import { API_END_POINT } from '../../constants/ApiUrl';

class Details extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      mode,
      id,
      subject,
      category,
      sub_category,
      priority,
      is_public,
      description,
      assigner,
      receivers,
      documents,
      logs,
      onCancel,
      categories,
    } = this.props;
    const { user } = this.context;

    return (
      <Formik
        initialValues={{
          id: id,
          subject: subject,
          category: category && category.id.toString(),
          sub_category: sub_category && sub_category.id,
          priority: priority,
          is_public: is_public ? '1' : '0',
          description: description,
          assignee: assigner && assigner.assign_id,
        }}
        onSubmit={(values, bag) => {
          setTimeout(async () => {
            const options = {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                'x-access-token': user.x_access_token,
              },
              body: JSON.stringify(values),
            };
            const response = await fetch(`${API_END_POINT}student/flag/update`, options);
            const body = await response.json();
            if (body.success) {
              console.log(body.data);
            }
            onCancel();
            bag.setSubmitting(false);
          }, 1000);
        }}
        render={(props) => (
          <form onSubmit={props.handleSubmit} className={css.Details}>
            <div>
              <BasicInfo {...this.props} {...props} categories={categories} />
              <Comments {...this.props} />
            </div>
            <div>
              {(!assigner || assigner.assigner_id !== user.id) && (
                <Assignee
                  mode={mode}
                  id={assigner && assigner.assign_id}
                  name={assigner && assigner.assigner}
                  avatar={assigner && assigner.avatar}
                  {...props}
                />
              )}
              <Tags items={receivers} {...props} />
              {assigner && assigner.assign_id === user.id && <AdminDetails {...this.props} />}
              <Attachment items={documents} />
              {mode === 'default' && <ModifyHistory items={logs} />}
              {mode === 'edit' && (
                <div className={mode}>
                  <DefaultButton text="Cancel" onClick={onCancel} />
                  <PrimaryButton text="Update" type="submit" />
                </div>
              )}
            </div>
          </form>
        )}
      />
    );
  }
}
Details.propTypes = {
  mode: PropTypes.string,
  id: PropTypes.string,
  subject: PropTypes.string,
  category: PropTypes.object,
  sub_category: PropTypes.object,
  priority: PropTypes.string,
  is_public: PropTypes.bool,
  description: PropTypes.string,
  assigner: PropTypes.object,
  created_by: PropTypes.object,
  receivers: PropTypes.array,
  documents: PropTypes.array,
  logs: PropTypes.array,
  onCancel: PropTypes.func,
  categories: PropTypes.array,
};

Details.contextType = AppContext;

export default Details;
