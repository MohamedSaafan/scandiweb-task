import { Component, createRef } from "react";
import "./color-choices.scss";
class ColorChoices extends Component {
  constructor(props) {
    super(props);
    this.state = { color: {} };
    this.ulRef = createRef();
  }

  componentDidMount() {
    this.setState({ color: this.props.currentActiveChoice });
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

  renderChoices = (choices, isMini) => {
    return choices.map((choice) => {
      const activeClass =
        choice.value === this.state.color.value
          ? "colorchoices__choiceActive"
          : "";

      return (
        <li
          className={`colorchoices__choice ${activeClass}`}
          onClick={this.setActiveClass}
          key={choice.value}
        >
          <button onClick={() => this.changeColor(choice)}>
            <span style={{ backgroundColor: choice.value }}></span>
          </button>
        </li>
      );
    });
  };

  render() {
    const choices = this.props.choices;
    const { isMini } = this.props;
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
