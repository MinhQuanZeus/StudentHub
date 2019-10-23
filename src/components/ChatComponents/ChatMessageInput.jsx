import React, { Component } from 'react';
import './ChatMessageInput.css';
import { withFormik } from 'formik';
import { getAccessToken } from '../../helpers';
import { apiConstants } from '../../constants/applicationConstants';
import { object, string } from 'yup';
import { Icon } from 'office-ui-fabric-react';

class MessageInput extends Component {
  constructor(props) {
    super(props);
  }

  onAttachFile = (event) => {
    if (event.target.files && event.target.files[0]) {
      const pattern = /image-|png|jpeg/;
      const file = event.target.files[0];
      if (!file) {
        return;
      }
      this.props.setFieldValue('file', file);
      if (!file.type.match(pattern)) {
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const url = event.target.result;
      };
    }
  };

  render() {
    const { values, handleChange, handleSubmit, isSubmitting, setFieldValue } = this.props;
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
          <div className="image-upload">
            <label htmlFor="file-input">
              <Icon iconName={'Attach'} />
            </label>

            <input id="file-input" type="file" onChange={this.onAttachFile} multiple={false} />
          </div>
          <button className="WindowInput-send-btn" type="submit">
            Send
          </button>
        </div>
        {values && values.file && (
          <div className="attach">
            <span>{values.file.name}</span>
            <Icon iconName={'Cancel'} onClick={() => setFieldValue('file', null)} />
          </div>
        )}
      </form>
    );
  }
}

export default withFormik({
  enableReinitialize: true,
  mapPropsToValues: () => ({
    message: '',
    file: null,
  }),
  validationSchema: object().shape({
    // message: string()
    //   .required()
    //   .label('Message'),
  }),
  handleSubmit: async (values, bag) => {
    try {
      if (!values.message && !values.file) {
        return;
      }
      const { groupDetails } = bag.props;
      const formData = new FormData();
      if (values['file']) {
        formData.append('attach', values['file']);
      }
      formData.append('message', values['message']);
      formData.append('group_id', groupDetails && groupDetails.chatroom_id);
      formData.append('channel_sid', groupDetails && groupDetails.sid);
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
