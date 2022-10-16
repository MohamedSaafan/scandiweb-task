import { Component } from "react";
import CartProductsList from "./components/cart-products-list";

class Cart extends Component {
  render() {
    return (
      <div className="cart">
        <h1 className="cart__heading">CART</h1>
        <CartProductsList />
      </div>
    );
  }
}
export default Cart;
