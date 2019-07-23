/* eslint-disable camelcase */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { format } from 'date-fns';
// import Status from '../../components/Status';
// import Priority from '../../components/Priority';
import BasicInfo from './BasicInfo';
import Assignee from './Assignee';
import Tags from './Tags';
import css from './Details.m.scss';
import Attachment from './Attachment';
import ModifyHistory from './ModifyHistory';
import Comments from './Comments';
import AdminDetails from './AdminDetails';
import { AppContext } from '../../containers/AppContext';

class Details extends Component {
  render() {
    const { assigner, receivers, documents, logs } = this.props;
    const { user } = this.context;

    return (
      <div className={css.Details}>
        <div>
          <BasicInfo {...this.props} />
          <Comments {...this.props} />
        </div>
        <div>
          {(!assigner || assigner.assigner_id !== user.id) && (
            <Assignee id={assigner && assigner.assign_id} name={assigner && assigner.assigner} avatar={assigner && assigner.avatar} />
          )}
          <Tags items={receivers} />
          {assigner && assigner.assign_id === user.id && <AdminDetails {...this.props} />}
          <Attachment items={documents} />
          <ModifyHistory items={logs} />
        </div>
      </div>
    );
  }
}
Details.propTypes = {
  assigner: PropTypes.object,
  created_by: PropTypes.object,
  receivers: PropTypes.array,
  documents: PropTypes.array,
  logs: PropTypes.array,
};

Details.contextType = AppContext;

export default Details;
