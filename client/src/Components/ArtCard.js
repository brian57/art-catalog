import React from "react";
import Button from "react-bootstrap/lib/Button";

class ArtCard extends React.Component {
  onDelete() {
    this.props.onDelete(this.props.id);
  }

  render() {
    return (
      <div className="artwork-box">
        {this.props.title}
        <img src={this.props.imgUrl} width={"100"} alt=""/>
        <Button bsStyle="danger" onClick={this.onDelete.bind(this)}>
          Delete
        </Button>
      </div>
    );
  }
}

export default ArtCard;
