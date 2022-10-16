import { Component } from "react";
import CartProduct from "../cart-product";

class CartProductsList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <CartProduct />
        <CartProduct />
      </div>
    );
  }
}

export default CartProductsList;
