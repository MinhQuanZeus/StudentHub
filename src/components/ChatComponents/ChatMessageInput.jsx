import React, { Component } from 'react';
import './ChatMessageInput.css';
import { withFormik } from 'formik';
import { getAccessToken } from '../../helpers';
import { apiConstants } from '../../constants/applicationConstants';
import { object, string } from 'yup';

class MessageInput extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { values, handleChange, handleSubmit, isSubmitting } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div className="WindowInput-container">
          <input
            type="text"
            placeholder="Type your messages"
            className="WindowInput-input"
            name="message"
            value={values.message}
            onChange={handleChange}
          />
          <button className="WindowInput-send-btn" type="submit">
            Send
          </button>
        </div>
      </form>
    );
  }
}

export default withFormik({
  enableReinitialize: true,
  mapPropsToValues: () => ({
    message: '',
  }),
  validationSchema: object().shape({
    message: string()
      .required()
      .label('Message'),
  }),
  handleSubmit: async (values, bag) => {
    try {
      const formData = new FormData();
      formData.append('message', values['message']);
      formData.append('group_id', '50');
      formData.append('channel_sid', 'CH033a188cf90d4c75b6148db28be4565c');
      const options = {
        method: 'POST',
        headers: {
          'x-access-token': getAccessToken(),
        },
        body: formData,
      };
      const response = await fetch(`${apiConstants.BACKEND_URL}chat/message/send_tx`, options);
      const body = await response.json();
      if (body.success) {
        console.log(body);
        bag.resetForm();
      }
    } catch (e) {
      console.log(e);
    } finally {
      bag.setSubmitting(false);
    }
  },
})(MessageInput);
