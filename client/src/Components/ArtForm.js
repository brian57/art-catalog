import React from "react";
import Button from "react-bootstrap/lib/Button";
import Dropzone from "react-dropzone";
import request from "superagent";
import Spinner from "./Spinner";
import { connect } from 'react-redux';
import { updateForm, submitForm } from '../actions/form';
import DatePicker from './DatePicker';

const CLOUDINARY_UPLOAD_PRESET = "kzppjij9";
const CLOUDINARY_UPLOAD_URL =
  "https://api.cloudinary.com/v1_1/deqalarf1/upload";

class ArtForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  handleDateChange(event) {
    this.props.updateForm({dateCreated: { [event.target.name]: event.target.value }});
  }

  handleChange(event) {
    this.props.updateForm({title: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.submitForm(this.props.formData);
  }

  onImageDrop(files) {
    this.props.updateForm({isUploadingImage: true, uploadedFile: files[0]});
    this.handleImageUpload(files[0]);
  }

  handleImageUpload(file) {
    let upload = request
      .post(CLOUDINARY_UPLOAD_URL)
      .field("upload_preset", CLOUDINARY_UPLOAD_PRESET)
      .field("file", file);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }

      if (response.body.secure_url !== "") {

        this.props.updateForm({
          uploadedFileCloudinaryUrl: response.body.secure_url,
          isUploadingImage: false
        });
      }
    });
  }

  render() {
    let dropzoneStyle = {
      width: 302,
      height: 300,
      border: "1px dashed #555",
      borderRadius: "10px",
      overflow: "hidden",
      position: "relative"
    };

    if (this.props.formData.isUploadingImage) {
      dropzoneStyle.backgroundColor = "rgba(255, 255, 255, 0.5)";
    }

    const activeStyle = {
      backgroundColor: "rgba(255, 255, 255, 0.5)"
    };

    var dropzoneInnerHTML;
    // Show image in background if one has already been uploaded.
    if (this.props.formData.uploadedFileCloudinaryUrl === "") {
      dropzoneInnerHTML = this.props.formData.isUploadingImage ? (
        <Spinner style={{ margin: 110 }} />
      ) : (
        <p>Drop an image or click to select a file to upload.</p>
      );
    } else {
      dropzoneInnerHTML = (
        <div>
          <div style={{ position: "absolute", top: 10, left: 10 }}>
            <p>{this.props.formData.uploadedFile.name}</p>
          </div>
          <div>
            <img
              src={this.props.formData.uploadedFileCloudinaryUrl}
              width={300}
              alt="uploaded_image"
            />
          </div>
        </div>
      );
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="container art-form">
          <div className="row">
            <div className="col-sm">
              <Dropzone
                multiple={false}
                accept="image/*"
                style={dropzoneStyle}
                activeStyle={activeStyle}
                onDrop={this.onImageDrop.bind(this)}
              >
                {dropzoneInnerHTML}
              </Dropzone>
            </div>
            <div className="col-sm">
              <div className="form-group">
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Title" 
                  value={this.props.formData.title}
                  onChange={this.handleChange}
                  />
                  </div>
              <div className="form-group">
                  <select className="custom-select">
                    <option defaultValue="">Category</option>
                    <option value="portrait">Portrait</option>
                    <option value="still life">Still Life</option>
                    <option value="abstract">Abstract</option>
                    <option value="drawing">Drawing</option>
                  </select>
              </div>
              <DatePicker dateVal={this.props.formData.dateCreated} handleChange={this.handleDateChange}/>
              <Button bsStyle="primary" type="submit">
                Submit
              </Button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}


const mapStateToProps = state => {
  return {
    formData: state.form
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateForm: (data) => dispatch(updateForm(data)),
    submitForm: (data) => dispatch(submitForm(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArtForm);