import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Component } from "react";
import { connect } from "react-redux";
import { countCartProducts } from "../../../../helpers/cart";
import CartOverlay from "../../../cart-overlay";
import Styles from "./cart-button.module.scss";
class CartButton extends Component {
  constructor(props) {
    super(props);
    this.state = { isModalOpened: false };
  }
  openModal = () => {
    this.setState({ isModalOpened: true });
  };
  closeModal = () => {
    this.setState({ isModalOpened: false });
  };
  toggleModal = () => {
    this.setState((state) => {
      return { isModalOpened: !state.isModalOpened };
    });
  };

  handleRootModalClick = (e) => {
    e.stopPropagation();
  };
  handleRootElementClick = (e) => {
    e.stopPropagation();
  };

  render() {
    return (
      <div className={Styles.cart} onClick={this.handleRootElementClick}>
        <button className={Styles.cart__button} onClick={this.toggleModal}>
          <div className={Styles.cart__button__count}>
            {this.props.numOfProducts}
          </div>
          <FontAwesomeIcon icon={faCartShopping} />
        </button>

        {this.state.isModalOpened && (
          <CartOverlay closeModal={this.closeModal} />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const numOfProducts = countCartProducts(state.cart);
  return { numOfProducts };
};
export default connect(mapStateToProps)(CartButton);
