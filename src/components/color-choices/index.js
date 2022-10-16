import { Component, createRef } from "react";
import "./color-choices.scss";
class ColorChoices extends Component {
  constructor(props) {
    super(props);
    this.state = { color: "#D3D2D5" };
    this.ulRef = createRef();
  }
  changeColor = (color) => {
    this.setState({ color });
  };

  setActiveClass = (event) => {
    const lis = this.ulRef.current.children;
    for (let li of lis) {
      li.classList.remove("colorchoices__choiceActive");
    }
    event.currentTarget.classList.add("colorchoices__choiceActive");
  };

  render() {
    return (
      <ul className="colorchoices" ref={this.ulRef}>
        <li
          className="colorchoices__choice colorchoices__choiceActive"
          onClick={this.setActiveClass}
        >
          <button onClick={() => this.changeColor("#D3D2D5")}>
            <span style={{ backgroundColor: "#D3D2D5" }}></span>
          </button>
        </li>
        <li className="colorchoices__choice" onClick={this.setActiveClass}>
          <button onClick={() => this.changeColor("#000000")}>
            <span style={{ backgroundColor: "#000000" }}></span>
          </button>
        </li>
        <li className="colorchoices__choice" onClick={this.setActiveClass}>
          <button onClick={() => this.changeColor("#0F6450")}>
            <span style={{ backgroundColor: "#0F6450" }}></span>
          </button>
        </li>
      </ul>
    );
  }
}

export default ColorChoices;
