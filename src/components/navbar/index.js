import { Component } from "react";
import Styles from "./navbar.module.scss";
import { shoppingSvg } from "../../svgs/shopping-logo.js";
import CurrencyDropDown from "./components/currency-dropdown";
import FilterOptions from "./components/filter-options";
import CartButton from "./components/cart-button";
import { connect } from "react-redux";
import {
  loadCategories,
  setActiveCategory,
} from "../../redux/actions/creators/categories";
import {
  loadCurrencies,
  setCurrentCurrency,
} from "../../redux/actions/creators/currency";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCurrencyDropOpened: false,
      currentCurrency: "usd",
    };
  }
  componentDidMount() {
    this.props.loadCategories();
    this.props.loadCurrencies();
  }

  componentDidUpdate() {}

  handleActiveCategoryChange = (category) => {
    this.props.setActiveCategory(category);
  };
  handleCurrentCurrencyChange = (currency) => {
    this.props.setCurrentCurrency(currency);
  };

  render() {
    const { currencies, currentCurrency, currencyLoadingStatus } = this.props;

    return (
      <nav className={Styles.navbar}>
        <FilterOptions
          options={this.props.categoriesNames}
          loadingStatus={this.props.status}
          activeCategory={this.props.activeCategory}
          handleCategoryChange={this.handleActiveCategoryChange}
        />
        <button className={Styles.navbar__logo}>{shoppingSvg}</button>
        <div className={Styles.navbar__options}>
          <CurrencyDropDown
            currencies={currencies}
            loadingStatus={currencyLoadingStatus}
            currentCurrency={currentCurrency}
            handleCurrencyChange={this.handleCurrentCurrencyChange}
          />
          <CartButton />
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  const categoriesNames = state.categories.categories.map(
    (category) => category.name
  );
  const { status: loadingStatus, activeCategory } = state.categories;

  const {
    currencies,
    currentCurrency,
    status: currencyLoadingStatus,
  } = state.currency;
  return {
    categoriesNames,
    loadingStatus,
    activeCategory,
    currencies,
    currentCurrency,
    currencyLoadingStatus,
  };
};

const actionCreators = {
  loadCategories,
  setActiveCategory,
  loadCurrencies,
  setCurrentCurrency,
};
export default connect(mapStateToProps, actionCreators)(Navbar);
