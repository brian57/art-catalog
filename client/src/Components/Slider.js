import React from "react";

class Slider extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    const containerCss = {
      height: 100,
      width: 300,
      border: "1px solid red",
      position: "relative",
    };

    return (
      <div className={"slider"} style={containerCss}>
        <input type="range" value={this.props.cardWidth} min="30" max="300" onChange={this.handleChange} />
      </div>
    );
  }

  handleChange (event) {
    const width = event.target.value;
    this.props.editCardWidth(width);
  }
}

export default Slider;
