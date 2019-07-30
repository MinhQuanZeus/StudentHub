/* global fetch */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import { Icon } from 'office-ui-fabric-react';
import cns from 'classnames';
import css from './Attachment.m.scss';
import { API_END_POINT, UPLOAD_IMAGES } from '../../constants/ApiUrl';

class Attachment extends Component {
  constructor(props) {
    super(props);
    this.onDrop = this.onDrop.bind(this);
  }

  async onDrop(acceptedFiles) {
    // eslint-disable-next-line no-undef
    const formData = new FormData();
    acceptedFiles.forEach((attachment) => {
      formData.append('images', attachment);
    });
    const response = await fetch(`${API_END_POINT}${UPLOAD_IMAGES}`, {
      method: 'POST',
      headers: {
        'X-Access-Token': this.context.accessToken,
      },
      body: formData,
    });
    const body = await response.json();
    if (body.success) {
      this.props.handleChange({
        target: {
          name: 'docs',
          value: body.data,
        },
      });
    }
    // .then(($response) => $response.json())
    // .then(($json) => this.onResponse($json.data))
    // .catch(($e) => this.onResponse());
  }

  render() {
    const { mode, items } = this.props;
    return (
      <div className={css.Attachment}>
        <label>Attachment</label>
        <ul>
          {items &&
            items.map((o, idx) => (
              <li key={idx}>
                <img src={o.url} />
              </li>
            ))}
          {mode === 'edit' && (
            <li>
              <Dropzone onDrop={this.onDrop}>
                {({ getRootProps, getInputProps, isDragActive }) => {
                  return (
                    <div
                      {...getRootProps()}
                      className={cns('dropzone', {
                        'dropzone--isActive': isDragActive,
                      })}
                    >
                      <input {...getInputProps()} />
                      <Icon iconName="Add" />
                    </div>
                  );
                }}
              </Dropzone>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

Attachment.propTypes = {
  mode: PropTypes.string,
  items: PropTypes.array,
  values: PropTypes.object,
  handleChange: PropTypes.func,
};

export default Attachment;
