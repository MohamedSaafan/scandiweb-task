import { Component } from "react";
import "./cart-product.scss";
import { connect } from "react-redux";
import { getPrice } from "../../../../helpers/getPrice";
import Options from "../../../options";
import {
  removeFromCart,
  addToCart,
  setCartAmount,
} from "../../../../redux/actions/creators/cart";
import rightArrow from "../../../../images/arrow-right.svg";
import leftArrow from "../../../../images/arrow-left.svg";
class CartProduct extends Component {
  constructor(props) {
    super(props);
    this.state = { currentImageIndex: 0 };
  }

  increaseImageIndex = (gallery) => {
    if (this.state.currentImageIndex === gallery.length - 1) {
      return this.setState({ currentImageIndex: 0 });
    }
    this.setState((state) => {
      return { currentImageIndex: state.currentImageIndex + 1 };
    });
  };

  decreaseImageIndex = (gallery) => {
    if (this.state.currentImageIndex === 0) {
      return this.setState({ currentImageIndex: gallery.length - 1 });
    }
    this.setState((state) => {
      return { currentImageIndex: state.currentImageIndex - 1 };
    });
  };

  handleIncreaseClick = (product, amount) => {
    this.props.setCartAmount(product.id, amount);
  };
  handleDecreaseClick = (product, amount) => {
    this.props.setCartAmount(product.id, amount);
  };

  render() {
    const { currentCurrency } = this.props;
    const { product, amount } = this.props.product;

    if (!currentCurrency) return <h1>Loading...</h1>;
    const price = getPrice(product, currentCurrency);
    return (
      <div className="cart__product">
        <div className="cart__product__left">
          {" "}
          <h2 className="cart__product__heading">{product.brand}</h2>
          <h3 className="cart__product__title">{product.name}</h3>
          <p className="cart__product__price">
            {price.currency.symbol} {price.amount.toFixed(2)}
          </p>
          <Options
            attributes={props.attributes}
            isMini={this.props.isMini}
            productId={product.id}
            shouldNotChangeOptions
            isCartOptions
          />
        </div>
        <div className="cart__product__right">
          <div className="cart__product__btns">
            <button
              onClick={() => this.handleIncreaseClick(product, amount + 1)}
            >
              +
            </button>
            <p>{amount}</p>{" "}
            <button
              onClick={() => this.handleDecreaseClick(product, amount - 1)}
            >
              -
            </button>
          </div>
          <div className="cart__product__image">
            <img
              src={product.gallery[this.state.currentImageIndex]}
              alt="clothes"
            />
            <div className="cart__product__arrows">
              <button
                className="cart__product__arrow"
                onClick={() => this.decreaseImageIndex(product.gallery)}
              >
                <img src={leftArrow} alt="left arrow" />
              </button>
              <button
                className="cart__product__arrow"
                onClick={() => this.increaseImageIndex(product.gallery)}
              >
                <img src={rightArrow} alt="right arrow" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { currentCurrency } = state.currency;
  return { currentCurrency };
};

const actionCreators = {
  setCartAmount,
  removeFromCart,
  addToCart,
};

export default connect(mapStateToProps, actionCreators)(CartProduct);
