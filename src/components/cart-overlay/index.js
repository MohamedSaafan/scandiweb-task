import { Component, createRef } from "react";
import { connect } from "react-redux";
import { extractCartProductsDetails } from "../../helpers/cart";
import CartProductsList from "../cart/components/cart-products-list";
import { fetchCartProducts } from "../../redux/actions/creators/prodcuts";
import "./cart-overlay.scss";
class CartOverlay extends Component {
  constructor(props) {
    super(props);
    this.modalRef = createRef();
  }
  componentDidMount() {
    this.props.fetchCartProducts();
  }
  handleRootModalClick = (event) => {
    if (event.target === this.modalRef.current) {
      this.props.closeModal();
    }
  };
  render() {
    const { products, cart, currentCurrency } = this.props;
    const cartProducts = extractCartProductsDetails(products, cart);
    if (!products || products.length === 0) {
      return (
        <div
          className="cart-overlay"
          ref={this.modalRef}
          onClick={this.handleRootModalClick}
        >
          <div className="cartModal" ref={this.modalRef}>
            {" "}
            <h1 className="cart-overlay__heading">Cart is Empty</h1>
          </div>
        </div>
      );
    }
    return (
      <div
        className="cart-overlay"
        ref={this.modalRef}
        onClick={this.handleRootModalClick}
      >
        <div className="cartModal">
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
