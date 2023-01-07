import {
  faArrowDown,
  faArrowUp,
  faDollar,
  faEur,
  faJpy,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Component } from "react";
import { loadCurrencyFromLocalStorage } from "../../../../helpers/currencies-localStorage";
import Styles from "./currency-dropdown.module.scss";

class CurrencyDropDown extends Component {
  constructor(props) {
    super(props);
    this.state = { isCurrencyDropOpened: false };
  }
  componentDidMount() {
    document.addEventListener("click", () => {
      this.setState({ isCurrencyDropOpened: false });
    });
  }

  componentDidUpdate() {}

  toggleCurrencyDropDown = () => {
    this.setState((prevState) => {
      return {
        isCurrencyDropOpened: !prevState.isCurrencyDropOpened,
      };
    });
  };

  changeCurrentCurrency = (currency) => {
    console.log(currency, "from changing currency");
    this.props.handleCurrencyChange(currency);
  };

  handleChangeCurrency = (currency) => {
    this.changeCurrentCurrency(currency);

    this.toggleCurrencyDropDown();
  };

  renderCurrencies = (currencies) => {
    return currencies.map((currency) => {
      return (
        <li className={Styles.currency__dropdown__option} key={currency.symbol}>
          <button onClick={() => this.handleChangeCurrency(currency)}>
            {" "}
            <span>{currency.symbol}</span>
            <br />
            <span>{currency.label}</span>
          </button>
        </li>
      );
    });
  };
  handleParentClick = (e) => {
    e.stopPropagation();
  };

  render() {
    const { currencies, currentCurrency } = this.props;
    const dropDownStatusClassName = this.state.isCurrencyDropOpened
      ? Styles.currency__dropdownOpened
      : "";

    return (
      <div className={Styles.currency} onClick={this.handleParentClick}>
        <button
          className={Styles.currency__dropdowntoggler}
          onClick={() => this.toggleCurrencyDropDown()}
        >
          <span>{currentCurrency?.symbol || ""}</span>
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
            {this.renderCurrencies(currencies)}
          </ul>
        </div>
      </div>
    );
  }
}

export default CurrencyDropDown;
