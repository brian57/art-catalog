import React from "react";
import ArtForm from "./ArtForm";
import ArtCard from "./ArtCard";
import Slider from "./Slider";
import {connect} from 'react-redux';
import { fetchArtwork, removeArtwork, editCardWidth } from "../actions/artworks";

class Layout extends React.Component {

  componentDidMount() {
    this.props.fetchArtwork();
  }

  onDelete(id) {
    this.props.removeArtwork(id);
  }

  render() {
    const footerStyle = {
      clear: "both",
      // width: 100,
      // height: 100,
      // border: "1px solid blue"
    };

    return (
      <div className="layout">
        <h1>Artworks</h1>
        {/* <ArtForm handleClick={this.handleClick.bind(this)} /> */}
        <ArtForm />
        <Slider editCardWidth={this.props.editCardWidth} widthVal={this.props.cardWidth}/>
        <div className="artwork-container">
          {this.props.artwork.map(artwork => (
            <ArtCard
              key={artwork.id}
              id={artwork.id}
              onDelete={this.onDelete.bind(this)}
              title={artwork.title}
              imgUrl={artwork.imgUrl}
              cardWidth={this.props.cardWidth}
            />
          ))}
          <div style={footerStyle} ></div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    artwork: state.artworks,
    cardWidth: state.cardWidth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    removeArtwork: (id) => dispatch(removeArtwork(id)),
    fetchArtwork: () => dispatch(fetchArtwork()),
    editCardWidth: (width) => dispatch(editCardWidth(width))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout);
