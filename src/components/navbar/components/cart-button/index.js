import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Component } from "react";
import Styles from "./cart-button.module.scss";
class CartButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  F;

  render() {
    return (
      <div className={Styles.cart}>
        <button>
          <FontAwesomeIcon icon={faCartShopping} />
        </button>
      </div>
    );
  }
}
export default CartButton;
