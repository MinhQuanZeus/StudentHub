/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
// import { format } from 'date-fns';
// import Status from '../../components/Status';
// import Priority from '../../components/Priority';
import BasicInfo from './BasicInfo';
import Assignee from './Assignee';
import Tags from './Tags';
import css from './Details.m.scss';
import Attachment from './Attachment';

function Details(props) {
  const { assigner, receivers, documents } = props;
  return (
    <div className={css.Details}>
      <div>
        <BasicInfo {...props} />
      </div>
      <div>
        {assigner && <Assignee id={assigner.id} name={assigner.assigner} avatar={assigner.avatar} />}
        {receivers && receivers.length > 0 && <Tags items={receivers} />}
        {documents && documents.length > 0 && <Attachment items={documents} />}
      </div>
    </div>
  );
}
Details.propTypes = {
  assigner: PropTypes.object,
  receivers: PropTypes.array,
  documents: PropTypes.array,
};
export default Details;
