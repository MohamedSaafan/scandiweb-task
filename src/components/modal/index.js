import { Component } from "react";
import ReactDOM from "react-dom";
import "./modal.scss";
class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = { isModalOpened: false };
  }
  componentDidMount() {
    const el = document.createElement("div");

    document.addEventListener("click", (e) => {});
  }

  render() {
    return ReactDOM.createPortal(
      <div className="modal" onClick={this.props.closeModal}>
        {this.props.children}
      </div>,
      document.getElementById("modal")
    );
  }
}

export default Modal;
