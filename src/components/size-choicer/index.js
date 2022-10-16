import { Component, createRef } from "react";
import "./size-choices.scss";
class SizesChoices extends Component {
  constructor(props) {
    super(props);
    this.state = { size: "s" };
    this.ulRef = createRef();
  }

  componentDidMount() {
    this.setState({ size: this.props.currentActiveSize || "s" });
  }
  changeSize = (size) => {
    this.setState({ size });
    this.props.handleSizeChange(size);
  };

  setActiveClass = (event) => {
    const lis = this.ulRef.current.children;
    for (let li of lis) {
      li.classList.remove("sizeschoices__choiceActive");
    }
    event.currentTarget.classList.add("sizeschoices__choiceActive");
  };
  renderSizes = (sizes) => {
    return sizes.map((size) => {
      const activeClass =
        size === this.state.size ? "sizeschoices__choiceActive" : "";
      return (
        <li
          className={`sizeschoices__choice ${activeClass}`}
          onClick={this.setActiveClass}
          key={size}
        >
          <button onClick={() => this.changeSize(size)}>
            {size.toUpperCase()}
          </button>
        </li>
      );
    });
  };
  render() {
    const sizes = this.props.sizes || ["s", "m", "l"];
    return (
      <ul className="sizeschoices" ref={this.ulRef}>
        {this.renderSizes(sizes)}
      </ul>
    );
  }
}

export default SizesChoices;
