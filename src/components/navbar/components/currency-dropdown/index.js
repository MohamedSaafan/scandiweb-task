import {
  faArrowDown,
  faArrowUp,
  faDollar,
  faEur,
  faJpy,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Component } from "react";
import Styles from "./currency-dropdown.module.scss";

class CurrencyDropDown extends Component {
  constructor(props) {
    super(props);
    this.state = { isCurrencyDropOpened: false, currentCurrency: "usd" };
  }

  toggleCurrencyDropDown = () => {
    this.setState((prevState) => {
      return { isCurrencyDropOpened: !prevState.isCurrencyDropOpened };
    });
  };

  changeCurrentCurrency = (currency) => {
    this.setState({ currentCurrency: currency });
  };

  handleChangeCurrency = (currency) => {
    this.changeCurrentCurrency(currency);
    this.toggleCurrencyDropDown();
  };

  render() {
    const { currentCurrency } = this.state;
    const dropDownStatusClassName = this.state.isCurrencyDropOpened
      ? Styles.currency__dropdownOpened
      : "";
    let activeCurrencySymbol =
      currentCurrency === "usd"
        ? faDollar
        : currentCurrency === "eur"
        ? faEur
        : faJpy;

    return (
      <div className={Styles.currency}>
        <button
          className={Styles.currency__dropdowntoggler}
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
          className={`${Styles.currency__dropdown} ${dropDownStatusClassName}`}
        >
          <ul className={Styles.currency__dropdown__list}>
            <li className={Styles.currency__dropdown__option}>
              <button onClick={() => this.handleChangeCurrency("usd")}>
                {" "}
                <FontAwesomeIcon icon={faDollar} />
                <span>USD</span>
              </button>
            </li>
            <li className={Styles.currency__dropdown__option}>
              <button onClick={() => this.handleChangeCurrency("eur")}>
                {" "}
                <FontAwesomeIcon icon={faEur} /> <span>EUR</span>
              </button>
            </li>
            <li className={Styles.currency__dropdown__option}>
              <button onClick={() => this.handleChangeCurrency("jpy")}>
                {" "}
                <FontAwesomeIcon icon={faJpy} /> <span>JPY</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default CurrencyDropDown;
