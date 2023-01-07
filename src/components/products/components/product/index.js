import { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import circleIcon from "../../../../images/circle-icon.png";
import { addToCart } from "../../../../redux/actions/creators/cart";
import "./product.scss";
class Product extends Component {
  constructor(props) {
    super(props);
    this.state = { shouldRedirectToCart: false };
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
    this.setState({ shouldRedirectToCart: true });
  };
  render() {
    const props = this.props;
    const { product } = props;
    const price = this.evaluatePrice();
    if (this.state.shouldRedirectToCart) return <Redirect to="/cart" />;

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

            <button
              className="product__cart"
              onClick={(e) => this.handleAddToCartClick(e, product.id)}
            >
              <img src={circleIcon} alt="cart" />
            </button>
          </div>
        </Link>

        <div className="product__details">
          <h4 className="product__title">{product.name}</h4>
          <p className="product__price">
            {price?.currency.symbol || " "} {price?.amount.toFixed(2)}
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
