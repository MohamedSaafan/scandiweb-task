import { Component, createRef } from "react";
import "./color-choices.scss";
class ColorChoices extends Component {
  constructor(props) {
    super(props);
    this.state = { color: "#D3D2D5" };
    this.ulRef = createRef();
  }

  componentDidMount() {
    this.setState({ color: this.props.currentActiveChoice || "#D3D2D5" });
  }
  changeColor = (color) => {
    this.setState({ color });
    this.props.handleColorChange(color);
  };

  setActiveClass = (event) => {
    const lis = this.ulRef.current.children;
    for (let li of lis) {
      li.classList.remove("colorchoices__choiceActive");
    }
    event.currentTarget.classList.add("colorchoices__choiceActive");
  };

  renderChoices = (choices) => {
    return choices.map((choice) => {
      const activeClass =
        choice === this.state.color ? "colorchoices__choiceActive" : "";
      return (
        <li
          className={`colorchoices__choice ${activeClass}`}
          onClick={this.setActiveClass}
          key={choice}
        >
          <button onClick={() => this.changeColor(choice)}>
            <span style={{ backgroundColor: choice }}></span>
          </button>
        </li>
      );
    });
  };

  render() {
    const choices = this.props.choices || ["#D3D2D5", "#000000", "#0F6450"];

    return (
      <ul className="colorchoices" ref={this.ulRef}>
        {this.renderChoices(choices)}
      </ul>
    );
  }
}

export default ColorChoices;
