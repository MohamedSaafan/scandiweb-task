import { Component } from "react";
import CartProduct from "../cart-product";

class CartProductsList extends Component {
  constructor(props) {
    super(props);
  }

  renderProducts = (products) => {
    return products.map((product) => (
      <CartProduct product={product} key={product.product.id} />
    ));
  };
  render() {
    const { products } = this.props;
    return <div>{this.renderProducts(products)}</div>;
  }
}

export default CartProductsList;
