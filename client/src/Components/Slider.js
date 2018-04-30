import React from "react";

class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    return (
      <div className={"slider"}>
        <input
          type="range"
          value={this.props.cardWidth}
          min="150"
          max="300"
          onChange={this.handleChange}
        />
      </div>
    );
  }

  handleChange(event) {
    const width = event.target.value;
    this.props.editCardWidth(width);
  }
}

export default Slider;
