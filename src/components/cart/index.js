import { Component } from "react";
import { connect } from "react-redux";
import { extractCartProductsDetails } from "../../helpers/cart";
import { fetchCartProducts } from "../../redux/actions/creators/prodcuts";
import CartProductsList from "./components/cart-products-list";
import TotalInvoiceCart from "./components/total-invoice-cart";

class Cart extends Component {
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
      <div className="cart">
        <h1 className="cart__heading">CART</h1>
        {cartProducts.length ? (
          <>
            {" "}
            <CartProductsList products={cartProducts} />
            <TotalInvoiceCart
              cartProducts={cartProducts}
              cart={cart}
              taxRatio={21}
              currentCurrency={currentCurrency}
            />{" "}
          </>
        ) : (
          ""
        )}
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
export default connect(mapStateToProps, actionCreators)(Cart);
