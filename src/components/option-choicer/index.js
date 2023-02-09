import { Component, createRef } from "react";
import "./size-choices.scss";
class OptionsRenderer extends Component {
  constructor(props) {
    super(props);
    this.state = { option: {} };
    this.ulRef = createRef();
  }

  componentDidMount() {
    this.changeOption(this.props.options[0]);
  }
  changeOption = (option) => {
    if (this.props.shouldNotChangeOptions) return;
    console.log(option, "from option");
    this.setState({ option });
    this.props.selectAttribute(this.props.id, option.id);
  };

  setActiveClass = (event) => {
    if (this.props.shouldNotChangeOptions) return;
    const lis = this.ulRef.current.children;
    for (let li of lis) {
      li.classList.remove("sizeschoices__choiceActive");
    }
    event.currentTarget.classList.add("sizeschoices__choiceActive");
  };
  renderOptions = (options, optionsId, productId) => {
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
          <button
            onClick={() => this.changeOption(option, optionsId, productId)}
          >
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
    const { id, productId } = this.props;
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
          {this.renderOptions(options, id, productId)}
        </ul>
      </>
    );
  }
}

export default OptionsRenderer;
