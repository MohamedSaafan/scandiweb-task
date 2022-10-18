import { Component } from "react";
import { connect } from "react-redux";
import { fetchCartProducts } from "../../redux/actions/creators/prodcuts";
import CartProductsList from "./components/cart-products-list";

class Cart extends Component {
  componentDidMount() {
    this.props.fetchCartProducts();
  }
  render() {
    return (
      <div className="cart">
        <h1 className="cart__heading">CART</h1>
        <CartProductsList />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { products } = state.products;
  const { cart } = state;
  return {
    cart,
    products,
  };
};

const actionCreators = {
  fetchCartProducts,
};
export default connect(mapStateToProps, actionCreators)(Cart);
