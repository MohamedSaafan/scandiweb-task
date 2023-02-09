import { Component, createRef } from "react";
import "./color-choices.scss";
class ColorChoices extends Component {
  constructor(props) {
    super(props);
    this.state = { color: {} };
    this.ulRef = createRef();
  }

  componentDidMount() {
    this.changeColor(this.props.choices[0]);
  }
  changeColor = (color) => {
    if (this.props.shouldNotChangeOptions) return;
    this.setState({ color });
    this.props.handleColorChange(color);
    this.props.selectAttribute(this.props.id, color.id);
  };

  setActiveClass = (event) => {
    if (this.props.shouldNotChangeOptions) return;
    const lis = this.ulRef.current.children;
    for (let li of lis) {
      li.classList.remove("colorchoices__choiceActive");
    }
    event.currentTarget.classList.add("colorchoices__choiceActive");
  };

  renderChoices = (choices) => {
    return choices.map((choice) => {
      const activeClass =
        choice.value === this.state.color.value
          ? "colorchoices__choiceActive"
          : "";
      const isWhite = choice.value.toLowerCase() === "#ffffff";

      return (
        <li
          className={`colorchoices__choice ${activeClass} ${
            isWhite ? "colorchoices__choiceWhite" : ""
          }`}
          onClick={this.setActiveClass}
          key={choice.value}
        >
          <button
            onClick={() =>
              this.changeColor(choice, this.props.id, this.props.productId)
            }
          >
            <span style={{ backgroundColor: choice.value }}></span>
          </button>
        </li>
      );
    });
  };

  render() {
    const choices = this.props.choices;

    return (
      <>
        <h4 className="productdetails__subtitle">COLOR: </h4>
        <ul className="colorchoices" ref={this.ulRef}>
          {this.renderChoices(choices)}
        </ul>
      </>
    );
  }
}

export default ColorChoices;
