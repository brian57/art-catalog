import React from "react";
import ArtForm from "./ArtForm";
import ArtCard from "./ArtCard";
import Slider from "./Slider";
import Modal from "./Modal";
import _ from "lodash";

import { connect } from "react-redux";
import {
  fetchArtwork,
  removeArtwork,
  editCardWidth,
} from "../actions/artworks";

import { createArtwork, updateArtwork, updateForm, clearForm } from "../actions/form";

class Layout extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleCardClick = this.handleCardClick.bind(this);
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  componentDidMount() {
    this.props.fetchArtwork();
  }

  onDelete(id) {
    this.props.removeArtwork(id);
  }

  handleCardClick(id) {
    // update form to have Artwork's data 
    const artworkData = _.find(this.props.artwork, (artwork) => artwork.id === id)

    let dateCreatedString = artworkData["dateCreated"];

    const dateRegex = /^(\d{4})-(\d\d?)-(\d\d?)/;
    const [, year, month, day] = dateRegex.exec(dateCreatedString);

    this.props.updateForm({
      id: id,
      uploadedFileCloudinaryUrl: artworkData["imgUrl"],
      title: artworkData["title"],
      category: artworkData["category"],
      dateCreated: {
        year: year,
        month: month,
        day: day,
      }
    });
    this.props.displayModal();
  }

  handleModalClose() {
    this.props.clearForm();
    this.props.hideModal();
  }

  handleModalSubmit() {
    this.props.updateArtwork(this.props.formData);
    this.props.hideModal();
  }

  render() {
    return (
      <div className="layout">
        <h1>Artworks</h1>

        <ArtForm
          updateForm={this.props.updateForm}
          submitForm={this.props.createArtwork}
          formData={this.props.formData}
        />
        <Slider
          editCardWidth={this.props.editCardWidth}
          widthVal={this.props.cardWidth}
        />
        <div className="artwork-container">
          {this.props.artwork.map(artwork => (
            <ArtCard
              key={artwork.id}
              id={artwork.id}
              isUpdating={artwork.isUpdating}
              onDelete={this.onDelete.bind(this)}
              title={artwork.title}
              imgUrl={artwork.imgUrl}
              cardWidth={this.props.cardWidth}
              handleClick={this.handleCardClick}
            />
          ))}
          <div style={{ clear: "both" }} />
        </div>

        <Modal
          show={this.props.showModal}
          handleClose={this.handleModalClose.bind(this)}
          handleModalSubmit={this.handleModalSubmit.bind(this)}
        >
          <h3>Edit Artwork</h3> 
          <ArtForm
            updateForm={this.props.updateForm}
            hideSubmit={true}
            formData={this.props.formData}
          />
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    artwork: state.artworks.artworks,
    formData: state.form,
    cardWidth: state.artworks.cardWidth,
    showModal: state.showModal
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeArtwork: id => dispatch(removeArtwork(id)),
    fetchArtwork: () => dispatch(fetchArtwork()),
    editCardWidth: width => dispatch(editCardWidth(width)),
    updateForm: data => dispatch(updateForm(data)),
    createArtwork: data => dispatch(createArtwork(data)),
    updateArtwork: data => dispatch(updateArtwork(data)),
    clearForm: data => dispatch(clearForm()),
    displayModal: () => dispatch({ type: "SHOW_MODAL" }),
    hideModal: () => dispatch({ type: "HIDE_MODAL" })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
