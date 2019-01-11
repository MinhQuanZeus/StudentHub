import React, { Component } from 'react';
import css from './Step2.module.scss';
import classnames from 'classnames';
import Dropzone from 'react-dropzone';
import './dropzone.scss';
class Step2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      acceptedFiles: null,
      rejectedFiles: null,
      previewUrls: []
    };

    this.onDrop = this.onDrop.bind(this);
    this.onLoad = this.onLoad.bind(this);
  }

  onLoad($event) {
    this.setState(state => {
      state.previewUrls.push($event.target.result);
      return state;
    });
  }

  onDrop = (acceptedFiles, rejectedFiles) => {
    acceptedFiles.map(img => {
      var reader = new FileReader();

      reader.onload = this.onLoad;

      reader.readAsDataURL(img);
    });

    this.setState(state => ({
      acceptedFiles: acceptedFiles,
      rejectedFiles: rejectedFiles
    }));
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
          <div style={{ display: 'flex', marginTop: 20 }}>
            {this.state.previewUrls &&
              this.state.previewUrls.map(img => (
                <img src={img} alt="preview" width={102} height={102} />
              ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Step2;
