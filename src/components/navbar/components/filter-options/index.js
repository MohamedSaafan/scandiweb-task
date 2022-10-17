import { Component, createRef } from "react";
import Styles from "./filter-options.module.scss";
class FilterOptions extends Component {
  constructor(props) {
    super(props);
    this.state = { activeCategory: "women" };
    this.ulRef = createRef();
  }

  componentDidUpdate() {
    if (this.state.activeCategory !== this.props.activeCategory) {
      this.setState({ activeCategory: this.props.activeCategory });
    }
  }
  changeCategory = (category) => {
    this.setState({ activeCategory: category });
    this.props.handleCategoryChange(category);
  };

  setActiveClass = (event) => {
    const lis = this.ulRef.current.children;
    for (let li of lis) {
      li.classList.remove(Styles.navs__navActive);
    }
    event.currentTarget.classList.add(Styles.navs__navActive);
  };

  renderOptions = (options) => {
    return options.map((option) => {
      const activeClassName =
        this.state.activeCategory === option ? Styles.navs__navActive : "";
      return (
        <li
          className={`${Styles.navs__nav} ${activeClassName}`}
          onClick={this.setActiveClass}
          key={option}
        >
          <button onClick={() => this.changeCategory(option)}>{option}</button>
        </li>
      );
    });
  };

  render() {
    return (
      <>
        {this.props.loadingStatus === "loading" ? (
          "Loading"
        ) : (
          <ul className={Styles.navs} ref={this.ulRef}>
            {this.renderOptions(this.props.options)}
          </ul>
        )}
      </>
    );
  }
}

export default FilterOptions;
