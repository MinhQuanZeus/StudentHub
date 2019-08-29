/* eslint-disable react/prop-types */
/* global FileReader, FormData, fetch */
import React, { Component } from 'react';
import css from './Step2.module.scss';
import classnames from 'classnames';
import Dropzone from 'react-dropzone';
import Actions from './Actions';
import Error from './Error';
import { withFormik } from 'formik';
import { API_END_POINT, UPLOAD_IMAGES } from '../../../constants/ApiUrl';

import './dropzone.scss';
import { HTTP_POST } from '../../../constants';
import { AppContext } from '../../../containers/AppContext';

export class ImagePreview extends Component {
  constructor(props) {
    super(props);
    this.onLoad = this.onLoad.bind(this);

    this.state = {
      src: null,
    };
    const reader = new FileReader();

    reader.onload = this.onLoad;

    reader.readAsDataURL(props.src);
  }

  onLoad($event) {
    this.setState((state) => ({ src: $event.target.result }));
  }

  render() {
    const { props, state } = this;
    return (
      state.src && (
        <li className={css.Image}>
          <img src={state.src} alt="avatar" />
          <span onClick={($event) => props.onRemove($event, props.src)}>
            <i className="fas fa-times" />
          </span>
        </li>
      )
    );
  }
}

export const Preview = (props) => {
  return (
    <ul className={css.Preview}>
      {props.files && props.files.map((src) => <ImagePreview key={src.name} src={src} onRemove={props.onRemove} />)}
    </ul>
  );
};

class Step2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      acceptedFiles: [],
    };

    this.onDrop = this.onDrop.bind(this);
    this.onRemove = this.onRemove.bind(this);
    this.onNext = this.onNext.bind(this);
    this.onPrevious = this.onPrevious.bind(this);
    this.onResponse = this.onResponse.bind(this);
  }

  onNext($event) {
    $event.preventDefault();
    const formData = new FormData();
    if (this.state.acceptedFiles) {
      this.state.acceptedFiles.forEach((attachment) => {
        formData.append('images', attachment);
      });
      fetch(`${API_END_POINT}${UPLOAD_IMAGES}`, {
        method: HTTP_POST,
        headers: {
          'X-Access-Token': this.context.accessToken,
        },
        body: formData,
      })
        .then(($response) => $response.json())
        .then(($json) => this.onResponse($json.data))
        .catch(($e) => this.onResponse());
    } else {
      this.props.onNext(this.props.values);
    }
  }

  onResponse($images) {
    this.props.onNext(Object.assign(this.props.values, { docs: $images }));
  }

  onPrevious($event) {
    $event.preventDefault();
    this.props.onPrevious(this.props.values);
  }

  onDrop = (acceptedFiles, rejectedFiles) => {
    const nextState = this.state;
    acceptedFiles.forEach((img) => {
      const obj = nextState.acceptedFiles.filter((f) => f.name === img.name);
      if (obj.length === 0) {
        nextState.acceptedFiles.push(img);
      }
    });

    this.setState((state) => nextState);
  };

  onRemove($event, $img) {
    this.setState((state) => ({
      acceptedFiles: state.acceptedFiles.filter((img) => img.name !== $img.name),
    }));
  }

  render() {
    const { props, state } = this;
    const { values, handleChange } = this.props;
    return (
      <form className={classnames(css.Step2, this.props.current !== 2 && css.Hidden)}>
        <div className={css.FormItem}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Type the description about flag"
            onChange={handleChange}
            value={values.description}
          />
        </div>
        <div className={css.FormItem} style={{ marginBottom: 30 }}>
          <label htmlFor="attachment">Attachment</label>
          <Dropzone onDrop={this.onDrop}>
            {({ getRootProps, getInputProps, isDragActive }) => {
              return (
                <div
                  {...getRootProps()}
                  className={classnames('dropzone', {
                    'dropzone--isActive': isDragActive,
                  })}
                >
                  <input {...getInputProps()} />
                  <i className="fas fa-plus" />
                  <p>Upload Images here</p>
                  {/* {isDragActive ? (
                    <p>Drop files here...</p>
                  ) : (
                    <i className="fas fa-plus"/>
                    <p>Upload Images here</p>
                  )} */}
                </div>
              );
            }}
          </Dropzone>
          <Preview files={state.acceptedFiles} onRemove={this.onRemove} />
        </div>
        <Error error={props.error} />
        <Actions current={props.current} onPrevious={this.onPrevious} onNext={this.onNext} />
      </form>
    );
  }
}

Step2.contextType = AppContext;

export default withFormik({
  mapPropsToValues: () => ({
    description: '',
  }),
})(Step2);
