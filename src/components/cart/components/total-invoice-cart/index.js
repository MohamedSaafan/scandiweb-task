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
        <div className="invoice__taxes">
          <h3>Tax {taxRatio}%:</h3> <span>{tax} </span>
        </div>

        <div className="invoice__quantity">
          <h3>Quantity:</h3> <span>{countCartProducts(cart)}</span>
        </div>
        <div className="invoice__price">
          <h3>Price:</h3> <span>{totalPrice}</span>
        </div>
        <button className="invoice__orderbtn">order</button>
      </div>
    );
  }
}

export default TotalInvoiceCart;
