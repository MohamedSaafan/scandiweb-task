import { Component, createRef } from "react";
import "./size-choices.scss";
class SizesChoices extends Component {
  constructor(props) {
    super(props);
    this.state = { size: "s" };
    this.ulRef = createRef();
  }
  changeSize = (size) => {
    this.setState({ size });
  };

  setActiveClass = (event) => {
    const lis = this.ulRef.current.children;
    for (let li of lis) {
      li.classList.remove("sizeschoices__choiceActive");
    }
    event.currentTarget.classList.add("sizeschoices__choiceActive");
  };

  render() {
    return (
      <ul className="sizeschoices" ref={this.ulRef}>
        <li
          className="sizeschoices__choice sizeschoices__choiceActive"
          onClick={this.setActiveClass}
        >
          <button onClick={() => this.changeSize("xs")}>XS</button>
        </li>
        <li className="sizeschoices__choice" onClick={this.setActiveClass}>
          <button onClick={() => this.changeSize("s")}>S</button>
        </li>
        <li className="sizeschoices__choice" onClick={this.setActiveClass}>
          <button onClick={() => this.changeSize("m")}>M</button>
        </li>
        <li className="sizeschoices__choice" onClick={this.setActiveClass}>
          <button onClick={() => this.changeSize("xs")}>L</button>
        </li>
      </ul>
    );
  }
}

export default SizesChoices;
