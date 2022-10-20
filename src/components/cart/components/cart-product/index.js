import image from "../../../../images/Image.png";
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

  handleSizeChange = (size) => {
    console.log(size, "from size changed in the product cart component");
  };
  handleColorChange = (color) => {
    console.log(color, " from color change inside the product cart component");
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
            {price.currency.symbol} {price.amount}
          </p>
          <Options attributes={product.attributes} isMini={this.props.isMini} />
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
                {"<"}
              </button>
              <button
                className="cart__product__arrow"
                onClick={() => this.increaseImageIndex(product.gallery)}
              >
                {">"}
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
