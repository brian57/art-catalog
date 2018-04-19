import React from "react";
import ArtForm from "./ArtForm";
import ArtCard from "./ArtCard";
import {connect} from 'react-redux';
import { fetchArtwork, removeArtwork } from "../actions/artworks";

class Layout extends React.Component {

  componentDidMount() {
    this.props.fetchArtwork();
  }

  onDelete(id) {
    this.props.removeArtwork(id);
  }

  render() {
    return (
      <div className="layout">
        <h1>Artworks</h1>
        {/* <ArtForm handleClick={this.handleClick.bind(this)} /> */}
        <ArtForm />
        <div className="artwork-container">
          {this.props.artwork.map(artwork => (
            <ArtCard
              key={artwork.id}
              id={artwork.id}
              onDelete={this.onDelete.bind(this)}
              title={artwork.title}
              imgUrl={artwork.imgUrl}
            />
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    artwork: state.artworks
  }
}

const mapDispatchToProps = dispatch => {
  return {
    removeArtwork: (id) => dispatch(removeArtwork(id)),
    fetchArtwork: () => dispatch(fetchArtwork())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout);
