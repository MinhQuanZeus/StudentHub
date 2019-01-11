import React, { Component } from 'react';
import css from './Step2.module.scss';
import classnames from 'classnames';
import Dropzone from 'react-dropzone';
import './dropzone.scss';

export class ImagePreview extends Component {
  constructor(props) {
    super(props);
    this.onLoad = this.onLoad.bind(this);
    this.state = {
      src: null
    };
    var reader = new FileReader();

    reader.onload = this.onLoad;

    reader.readAsDataURL(props.src);
  }

  onLoad($event) {
    this.setState(state => ({ src: $event.target.result }));
  }

  render() {
    const { state } = this;
    return (
      state.src && (
        <li className={css.Image}>
          <img src={state.src} alt="avatar" />
          <span>
            <i className="fas fa-times" />
          </span>
        </li>
      )
    );
  }
}

export const Preview = props => {
  return (
    <ul className={css.Preview}>
      {props.files && props.files.map(src => <ImagePreview src={src} />)}
    </ul>
  );
};

class Step2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      acceptedFiles: []
    };

    this.onDrop = this.onDrop.bind(this);
  }
  onDrop = (acceptedFiles, rejectedFiles) => {
    const nextState = this.state;
    acceptedFiles.forEach(img => {
      const obj = nextState.acceptedFiles.filter(f => f.name === img.name);
      if (obj.length === 0) {
        nextState.acceptedFiles.push(img);
      }
    });

    this.setState(state => nextState);
  };

  render() {
    return (
      <div
        className={classnames(
          css.Step2,
          this.props.current !== 2 && css.Hidden
        )}
      >
        <div className={css.FormItem}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Type the description about flag"
          />
        </div>
        <div className={css.FormItem} style={{ marginBottom: 30 }}>
          <label htmlFor="description">Attachment</label>
          <Dropzone onDrop={this.onDrop}>
            {({ getRootProps, getInputProps, isDragActive }) => {
              return (
                <div
                  {...getRootProps()}
                  className={classnames('dropzone', {
                    'dropzone--isActive': isDragActive
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
          {/* <div style={{ display: 'flex', marginTop: 20 }}>
            {this.state.previewUrls &&
              this.state.previewUrls.map(img => (
                <img src={img} alt="preview" width={102} height={102} />
              ))}
          </div> */}
          <Preview files={this.state.acceptedFiles} />
        </div>
      </div>
    );
  }
}

export default Step2;
