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
  }

  componentDidUpdate() {
    console.log(this.props.categoriesNames, "from categories");
  }

  handleActiveCategoryChange = (category) => {
    this.props.setActiveCategory(category);
  };

  render() {
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
          <CurrencyDropDown />
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
  return {
    categoriesNames,
    loadingStatus,
    activeCategory,
  };
};

const actionCreators = {
  loadCategories,
  setActiveCategory,
};
export default connect(mapStateToProps, actionCreators)(Navbar);
