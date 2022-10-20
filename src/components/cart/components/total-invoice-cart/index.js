import { Component } from "react";
import {
  calculateTotalPrice,
  countCartProducts,
} from "../../../../helpers/cart";
import "./total-invoice.scss";

class TotalInvoiceCart extends Component {
  calculateTax = (price, ratio) => {
    let extraRatio = price * ratio;
    return +extraRatio.toFixed(2);
  };

  render() {
    const { cartProducts, taxRatio, currentCurrency, cart } = this.props;
    const price = calculateTotalPrice(cartProducts, currentCurrency);
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
