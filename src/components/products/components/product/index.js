import { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import circleIcon from "../../../../images/circle-icon.png";
import { addToCart } from "../../../../redux/actions/creators/cart";
import "./product.scss";
class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  evaluatePrice = () => {
    const { product } = this.props;
    if (!product) {
      return;
    }
    if (!this.props.currentCurrency) return;

    const price = product.prices.find(
      (price) => price.currency.symbol === this.props.currentCurrency.symbol
    );
    return price;
  };

  inCart = (productId, cart) => {
    const item = cart.find((item) => item.id === productId);
    return item ? true : false;
  };

  handleAddToCartClick = (e, productId) => {
    // e.stopPropagation();
    e.preventDefault();
    this.props.addToCart(productId);
  };
  render() {
    const props = this.props;
    const { product, cart } = props;
    const price = this.evaluatePrice();
    const inCart = this.inCart(product.id, cart);

    return (
      <article
        className={`product ${product.inStock ? "" : "product-outofstock"}`}
      >
        {product.inStock ? (
          ""
        ) : (
          <span className="product__outofstock">
            {props.inStock ? "" : <h3>OUT OF STOCK</h3>}
          </span>
        )}
        <Link to={`/products/${product.id}`}>
          <div className="product__header">
            <img
              src={`${product.gallery[0]}`}
              alt="clothes"
              className="product__image"
            />
            {inCart ? (
              <>item in cart</>
            ) : (
              <button
                className="product__cart"
                onClick={(e) => this.handleAddToCartClick(e, product.id)}
              >
                <img src={circleIcon} alt="cart" />
              </button>
            )}
          </div>
        </Link>

        <div className="product__details">
          <h4 className="product__title">{product.name}</h4>
          <p className="product__price">
            {price?.currency.symbol || "" + " "} {price?.amount}
          </p>
        </div>
      </article>
    );
  }
}
const mapStateToProps = (state) => {
  const { currentCurrency } = state.currency;
  const { cart } = state;
  return { currentCurrency, cart };
};
const actionCreators = {
  addToCart,
};

export default connect(mapStateToProps, actionCreators)(Product);
