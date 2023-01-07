import { Component } from "react";
import Styles from "./currency-dropdown.module.scss";
import arrowDown from "../../../../images/arrow-down.svg";
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
          <span className={Styles.currency__symbol}>
            {currentCurrency?.symbol || ""}
          </span>
          <span className={Styles.currency__arrow}>
            {this.state.isCurrencyDropOpened ? (
              <img
                src={arrowDown}
                alt="arrow UP"
                className={Styles.currency__arrowUp}
              />
            ) : (
              <img
                src={arrowDown}
                alt="arrow down"
                className={Styles.currency__arrowDown}
              />
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
