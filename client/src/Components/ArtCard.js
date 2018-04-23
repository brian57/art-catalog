import React from "react";
import Button from "react-bootstrap/lib/Button";

class ArtCard extends React.Component {
  onDelete() {
    this.props.onDelete(this.props.id);
  }

  render() {

    const containerStyle = {
      width: this.props.cardWidth + "px",
      height: this.props.cardWidth + "px",
      cursor: "pointer",
      position: "relative",
    }

    const boxStyle = {
      backgroundImage: `url(${this.props.imgUrl})`,
      backgroundPosition: "center center",
      backgroundOrigin: "border-box",
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
    }

    return (
      <div className="artwork-card" style={containerStyle}>
        <div className="inner-card" style={boxStyle} >
          <div className="overlay">
            <div className="title-container">
              {this.props.title}
            </div>
            <div className="button-container">
              <Button bsStyle="danger" className="deleteButton" onClick={this.onDelete.bind(this)}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ArtCard;
