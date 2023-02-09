import { Component } from "react";
import CartProduct from "../cart-product";

class CartProductsList extends Component {
  renderProducts = (products) => {
    return products.map((product) => {
      return (
        <CartProduct
          product={product}
          attributes={product.selectedAttributes}
          key={product.UUID}
          isMini={this.props.isMini ? true : false}
        />
      );
    });
  };
  render() {
    const { products } = this.props;
    return <div>{this.renderProducts(products)}</div>;
  }
}

export default CartProductsList;
