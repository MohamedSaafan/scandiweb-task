import { Component, createRef } from "react";
import "./size-choices.scss";
class SizesChoices extends Component {
  constructor(props) {
    super(props);
    this.state = { option: {} };
    this.ulRef = createRef();
  }

  componentDidMount() {
    this.setState({ option: this.props.options[0] });
  }
  changeOption = (option) => {
    this.setState({ option });
    // this.props.handleSizeChange(option);
  };

  setActiveClass = (event) => {
    const lis = this.ulRef.current.children;
    for (let li of lis) {
      li.classList.remove("sizeschoices__choiceActive");
    }
    event.currentTarget.classList.add("sizeschoices__choiceActive");
  };
  renderOptions = (options) => {
    console.log(options, "from options");

    if (!options) return <></>;
    return options.map((option) => {
      const activeClass =
        option.value === this.state.option?.value
          ? "sizeschoices__choiceActive"
          : "";
      const miniClassName = this.getMiniClass("sizeschoices__choice");

      return (
        <li
          className={`sizeschoices__choice ${miniClassName} ${activeClass}`}
          onClick={this.setActiveClass}
          key={option.id}
        >
          <button onClick={() => this.changeOption(option)}>
            {option.displayValue}
          </button>
        </li>
      );
    });
  };

  getMiniClass = (className) => {
    const miniClassName = this.props.isMini ? className + "-mini" : "";
    return miniClassName;
  };
  render() {
    const options = this.props.options;
    if (!options) return <></>;

    return (
      <>
        <h4
          className={
            "productdetails__subtitle " +
            this.getMiniClass("productdetails__subtitle")
          }
        >
          {this.props.title}:{" "}
        </h4>
        <ul
          className={"sizeschoices " + this.getMiniClass("sizeschoices")}
          ref={this.ulRef}
        >
          {this.renderOptions(options)}
        </ul>
      </>
    );
  }
}

export default SizesChoices;
