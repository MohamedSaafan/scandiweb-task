import { Component } from "react";
import { Link } from "react-router-dom";
import { calculateTotalPrice } from "../../helpers/cart";
import "./cart-overlay-footer.scss";

class CartOverLayFooter extends Component {
  render() {
    const { cartProducts, currentCurrency } = this.props;
    const totalPrice = calculateTotalPrice(cartProducts, currentCurrency);
    return (
      <div className="cartoverlay__footer">
        <div className="cartoverlay__footer__price">
          <span>Total</span>{" "}
          <span>
            {currentCurrency.symbol}
            {totalPrice}
          </span>
        </div>
        <div className="cartoverlay__footer__btns">
          <Link to="/cart" className="cartoverlay__footer__btn">
            VIEW BAG
          </Link>
          <button className="cartoverlay__footer__btn">CHECK OUT</button>
        </div>
      </div>
    );
  }
}
export default CartOverLayFooter;
