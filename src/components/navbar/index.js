import { Component, createRef } from "react";
import Styles from "./navbar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faDollar,
  faEur,
  faJpy,
  faArrowDown,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { shoppingSvg } from "../../svgs/shopping-logo.js";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeCategory: "women",
      isCurrencyDropOpened: false,
      currentCurrency: "usd",
    };
    this.ulRef = createRef();
  }
  componentDidUpdate() {
    console.log(this.state);
  }

  changeCategory = (category) => {
    this.setState({ activeCategory: category });
  };
  toggleCurrencyDropDown = () => {
    this.setState((prevState) => {
      return { isCurrencyDropOpened: !prevState.isCurrencyDropOpened };
    });
  };
  changeCurrentCurrency = (currency) => {
    this.setState({ currentCurrency: currency });
  };
  setActiveClass = (event) => {
    const lis = this.ulRef.current.children;
    for (let li of lis) {
      li.classList.remove(Styles.navbar__navActive);
    }
    event.currentTarget.classList.add(Styles.navbar__navActive);
  };

  handleChangeCurrency = (currency) => {
    this.changeCurrentCurrency(currency);
    this.toggleCurrencyDropDown();
  };

  render() {
    const { currentCurrency } = this.state;
    const dropDownStatusClassName = this.state.isCurrencyDropOpened
      ? Styles.navbar__currency__dropdownOpened
      : "";
    let activeCurrencySymbol =
      currentCurrency === "usd"
        ? faDollar
        : currentCurrency === "eur"
        ? faEur
        : faJpy;
    return (
      <nav className={Styles.navbar}>
        <ul className={Styles.navbar__navs} ref={this.ulRef}>
          <li
            className={`${Styles.navbar__navActive} ${Styles.navbar__nav}`}
            onClick={this.setActiveClass}
          >
            <button onClick={() => this.changeCategory("women")}>WOMEN</button>
          </li>
          <li className={Styles.navbar__nav} onClick={this.setActiveClass}>
            <button onClick={() => this.changeCategory("men")}>MEN</button>
          </li>
          <li className={Styles.navbar__nav} onClick={this.setActiveClass}>
            <button onClick={() => this.changeCategory("kids")}>KIDS</button>
          </li>
        </ul>

        <button className={Styles.navbar__logo}>{shoppingSvg}</button>
        <div className={Styles.navbar__options}>
          <div className={Styles.navbar__currency}>
            <button
              className={Styles.navbar__options__dropdowntoggler}
              onClick={() => this.toggleCurrencyDropDown()}
            >
              <FontAwesomeIcon icon={activeCurrencySymbol} />{" "}
              <span>
                {this.state.isCurrencyDropOpened ? (
                  <FontAwesomeIcon icon={faArrowUp} />
                ) : (
                  <FontAwesomeIcon icon={faArrowDown} />
                )}
              </span>
            </button>
            <div
              className={`${Styles.navbar__currency__dropdown} ${dropDownStatusClassName}`}
            >
              <ul className={Styles.navbar__currency__dropdown__list}>
                <li className={Styles.navbar__currency__dropdown__option}>
                  <button onClick={() => this.handleChangeCurrency("usd")}>
                    {" "}
                    <FontAwesomeIcon icon={faDollar} />
                    <span>USD</span>
                  </button>
                </li>
                <li className={Styles.navbar__currency__dropdown__option}>
                  <button onClick={() => this.handleChangeCurrency("eur")}>
                    {" "}
                    <FontAwesomeIcon icon={faEur} /> <span>EUR</span>
                  </button>
                </li>
                <li className={Styles.navbar__currency__dropdown__option}>
                  <button onClick={() => this.handleChangeCurrency("jpy")}>
                    {" "}
                    <FontAwesomeIcon icon={faJpy} /> <span>JPY</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className={Styles.navbar__cart}>
            <button>
              <FontAwesomeIcon icon={faCartShopping} />
            </button>
          </div>
        </div>
      </nav>
    );
  }
}
export default Navbar;
