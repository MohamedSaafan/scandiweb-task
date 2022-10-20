import { Component, createRef } from "react";
import {
  getLocalStorageOption,
  setLocalStorageOption,
} from "../../helpers/options-local-storage";
import "./color-choices.scss";
class ColorChoices extends Component {
  constructor(props) {
    super(props);
    this.state = { color: {} };
    this.ulRef = createRef();
  }

  componentDidMount() {
    const storedOptionValue = getLocalStorageOption(
      this.props.id,
      this.props.productId
    );
    this.setState({
      color: storedOptionValue || this.props.currentActiveChoice,
    });
  }
  changeColor = (color, optionsId, productId) => {
    this.setState({ color });
    setLocalStorageOption(optionsId, productId, color);
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
