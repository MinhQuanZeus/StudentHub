/* eslint-disable camelcase */
/* global fetch */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import './Comment.scss';
import { AppContext } from '../../../containers/AppContext';
import { API_END_POINT } from '../../../constants/ApiUrl';
import { Persona } from 'office-ui-fabric-react';
class Comment extends Component {
  constructor(props) {
    super(props);
    this.post = this.post.bind(this);
  }

  async post($event) {
    $event.preventDefault();
    const { values } = this.props;
    const token = this.context.user.x_access_token;
    // Old comment api path => educator/flag/comment
    const response = await fetch(`${API_END_POINT}student/flag/comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
      body: JSON.stringify({
        flag_id: this.props.id,
        subject: 'subject is empty',
        comment: values.message,
        parent: -1,
        is_public: 1,
        docs: [],
      }),
    });
    const body = await response.json();
    if (body.success) {
      this.props.setFieldValue('message', '');
      this.props.onSuccess(body);
    }
  }

  render() {
    const { values, handleChange } = this.props;
    const { created_by, assigner, receivers } = this.props;
    const { user } = this.context;

    return (
      <form className="Header">
        <Persona text={user.first_name} imageAlt={user.first_name} imageUrl={user.photo_url} />
        <input
          type="text"
          className="message"
          name="message"
          placeholder="Write Comment"
          onChange={handleChange}
          value={values.message}
          disabled={
            !(
              (created_by && created_by.id === user.id) ||
              (assigner && assigner.id === user.id) ||
              (receivers && receivers.length > 0 && receivers.filter((o) => o.record_id === user.id).length > 0)
            )
          }
        />
        <button type="button" onClick={(event) => this.post(event)}>Post</button>
      </form>
    );
  }
}

Comment.propTypes = {
  id: PropTypes.string,
  values: PropTypes.object,
  handleChange: PropTypes.func,
  created_by: PropTypes.object,
  assigner: PropTypes.object,
  receivers: PropTypes.array,
  onSuccess: PropTypes.func,
  setFieldValue: PropTypes.func,
};

Comment.contextType = AppContext;

export default withFormik({
  mapPropsToValues: () => ({
    message: '',
  }),
})(Comment);
