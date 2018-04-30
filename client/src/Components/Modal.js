import React from "react";
import Button from "react-bootstrap/lib/Button";
import ScrollLock from "react-scrolllock";

/**
 * Had issues with React Bootstrap Modal and React 16 so made a simple cutom 
 * one instead
 */
class Modal extends React.Component {
  render() {
    if (!this.props.show) {
      return <div />;
    }

    const backdropStyle = {
      opacity: 0.5,
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      position: "fixed",
      backgroundColor: "black"
    };

    const modalStyle = {
      top: "10%",
      left: "10%",
      right: "10%",
      maxWidth: "700px",
      bottom: "10%",
      marginLeft: "auto",
      marginRight: "auto",
      backgroundColor: "white",
      position: "fixed",
      borderRadius: "10px",
      overflow: "hidden",
      zIndex: 1000
    };

    const footerStyle = {
      height: "75px",
      width: "100%",
      borderTop: "1px solid #ccc",
      position: "absolute",
      bottom: 0
    };

    const bodyStyle = {
      margin: "10px",
      position: "absolute",
      overflowY: "scroll",
      boxSizing: "content-box",
      paddingRight: "17px",
      top: 0,
      bottom: 75,
      width: "100%"
    }

    return (
      <div>
        <div className="backdrop" style={backdropStyle} />
        <div className="myModal" style={modalStyle}>
          <div className="modalBody" style={bodyStyle}>
            {this.props.children}
          </div>
          <div className="footer" style={footerStyle}>
            <Button
              bsStyle="primary"
              className="float-right m-2"
              onClick={this.props.handleModalSubmit}
            >
              Submit
            </Button>

            <Button
              className="float-right my-2"
              onClick={this.props.handleClose}
            >
              Close
            </Button>
          </div>
        </div>
        <ScrollLock />
      </div>
    );
  }
}

export default Modal;
