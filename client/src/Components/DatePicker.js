import React from "react";
import _ from "lodash";

/* Simple date picker 
 * TODO check for invalid dates
*/

class DatePicker extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    const selectCss = {
      width: "inherit",
      float: "left"
    };

    const currentYear = new Date().getFullYear();

    return (
      <div className="form-group" style={{ textAlign: "left" }}>
        <label>Date Created: (M/D/Y) </label>
        <div>
          <select
            name="month"
            className="custom-select"
            style={selectCss}
            onChange={this.handleChange}
            defaultValue={parseInt(this.props.dateVal.month, 10)}
          >
            {this.createOptions(_.range(1, 13))}
          </select>
          <select
            name="day"
            className="custom-select"
            style={selectCss}
            onChange={this.handleChange}
            defaultValue={parseInt(this.props.dateVal.day, 10)}
          >
            {this.createOptions(_.range(1, 32))}
          </select>
          <select
            name="year"
            className="custom-select"
            style={selectCss}
            onChange={this.handleChange}
            defaultValue={this.props.dateVal.year}
          >
            {this.createOptions(_.range(currentYear, currentYear - 100, -1))}
          </select>
        </div>
        <div style={{ clear: "both" }} />
      </div>
    );
  }

  createOptions(range) {
    return range.map(val => (
      <option key={val} value={val}> {val} </option>
    ));
  }

  handleChange(event) {
    console.log("EVENT = ")
    console.log(event.target.name);
    this.props.handleChange(event)
  }
}

export default DatePicker;
