import { Component } from "react";
import { connect } from "react-redux";
import { extractCartProductsDetails } from "../../helpers/cart";
import CartProductsList from "../cart/components/cart-products-list";
import { fetchCartProducts } from "../../redux/actions/creators/prodcuts";
import "./cart-overlay.scss";
class CartOverlay extends Component {
  componentDidMount() {
    this.props.fetchCartProducts();
  }
  render() {
    const { products, cart, currentCurrency } = this.props;
    const cartProducts = extractCartProductsDetails(products, cart);
    if (!products || products.length === 0) {
      return <h1>Cart is Empty</h1>;
    }
    return (
      <div className=" cart-overlay">
        <div onClick={this.handleRootModalClick} className="cartModal">
          <CartProductsList products={cartProducts} />
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  const { products } = state.products;
  const { cart } = state;
  const { currentCurrency } = state.currency;
  return {
    cart,
    products,
    currentCurrency,
  };
};
const actionCreators = {
  fetchCartProducts,
};

export default connect(mapStateToProps, actionCreators)(CartOverlay);
