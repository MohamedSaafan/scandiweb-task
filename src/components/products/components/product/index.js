import { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import circleIcon from "../../../../images/circle-icon.png";
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
  render() {
    const props = this.props;
    const { product } = props;
    const price = this.evaluatePrice();
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
            <button className="product__cart">
              <img src={circleIcon} alt="cart" />
            </button>
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
  return { currentCurrency };
};

export default connect(mapStateToProps)(Product);
