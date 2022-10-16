import { Component } from "react";
import Styles from "./navbar.module.scss";

import { shoppingSvg } from "../../svgs/shopping-logo.js";
import CurrencyDropDown from "./components/currency-dropdown";
import FilterOptions from "./components/filter-options";
import CartButton from "./components/cart-button";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCurrencyDropOpened: false,
      currentCurrency: "usd",
    };
  }
  componentDidUpdate() {
    console.log(this.state);
  }

  render() {
    return (
      <nav className={Styles.navbar}>
        <FilterOptions />
        <button className={Styles.navbar__logo}>{shoppingSvg}</button>
        <div className={Styles.navbar__options}>
          <CurrencyDropDown />
          <CartButton />
        </div>
      </nav>
    );
  }
}
export default Navbar;
