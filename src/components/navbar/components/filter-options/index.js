import { Component, createRef } from "react";
import Styles from "./filter-options.module.scss";
class FilterOptions extends Component {
  constructor(props) {
    super(props);
    this.state = { activeCategory: "women" };
    this.ulRef = createRef();
  }

  changeCategory = (category) => {
    this.setState({ activeCategory: category });
  };

  setActiveClass = (event) => {
    const lis = this.ulRef.current.children;
    for (let li of lis) {
      li.classList.remove(Styles.navs__navActive);
    }
    event.currentTarget.classList.add(Styles.navs__navActive);
  };

  render() {
    return (
      <ul className={Styles.navs} ref={this.ulRef}>
        <li
          className={`${Styles.navs__navActive} ${Styles.navs__nav}`}
          onClick={this.setActiveClass}
        >
          <button onClick={() => this.changeCategory("women")}>WOMEN</button>
        </li>
        <li className={Styles.navs__nav} onClick={this.setActiveClass}>
          <button onClick={() => this.changeCategory("men")}>MEN</button>
        </li>
        <li className={Styles.navs__nav} onClick={this.setActiveClass}>
          <button onClick={() => this.changeCategory("kids")}>KIDS</button>
        </li>
      </ul>
    );
  }
}
export default FilterOptions;
