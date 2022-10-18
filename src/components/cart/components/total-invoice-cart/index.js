import { Component } from "react";
import { countCartProducts } from "../../../../helpers/cart";
import { getPrice } from "../../../../helpers/getPrice";
import "./total-invoice.scss";

class TotalInvoiceCart extends Component {
  calculateTotalPrice = (products, currentCurrency) => {
    let price = 0;

    products.forEach((product) => {
      price +=
        getPrice(product.product, currentCurrency).amount * product.amount;
    });
    return price;
  };
  calculateTax = (price, ratio) => {
    let extraRatio = price * ratio;
    return +extraRatio.toFixed(2);
  };

  render() {
    const { cartProducts, taxRatio, currentCurrency, cart } = this.props;
    const price = this.calculateTotalPrice(cartProducts, currentCurrency);
    const tax = this.calculateTax(price, taxRatio / 100);
    const totalPrice = (price + tax).toFixed(2);

    return (
      <div className="invoice">
        <p className="invoice__taxes">
          <h3>Tax {taxRatio}%:</h3> <span>{tax} </span>
        </p>

        <p className="invoice__quantity">
          <h3>Quantity:</h3> <span>{countCartProducts(cart)}</span>
        </p>
        <p className="invoice__price">
          <h3>Price:</h3> <span>{totalPrice}</span>
        </p>
        <button className="invoice__orderbtn">order</button>
      </div>
    );
  }
}

export default TotalInvoiceCart;
