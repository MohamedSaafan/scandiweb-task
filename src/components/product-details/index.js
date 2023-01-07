import { Component } from "react";
import ColorChoices from "../color-choicer";
import { fetchProduct } from "../../redux/actions/creators/prodcuts";
import { addToCart } from "../../redux/actions/creators/cart";
import "./product-details.scss";
import { connect } from "react-redux";
import OptionChoicer from "../option-choicer";
import { Link } from "react-router-dom";
import { getPrice } from "../../helpers/getPrice";
import Options from "../options";
import parse from "html-react-parser";
import * as sanitizeHtml from "sanitize-html";
class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { mainImageIndex: 0 };
  }
  componentDidMount() {
    this.props.fetchProduct(this.props.match.params.id);
  }
  componentDidUpdate() {}

  handleSmallImageClick = (index) => {
    this.setState({ mainImageIndex: index });
  };

  renderSmallImages = (product) => {
    let gallery = product.gallery;
    if (product.gallery.length > 3) {
      gallery = gallery.slice(0, 3);
    }

    return gallery.map((image, index) => (
      <div
        key={image}
        className="productdetails__images__wrapper"
        onClick={() => this.handleSmallImageClick(index)}
      >
        <img src={`${image}`} alt={product.name} />
      </div>
    ));
  };

  handleAddToCartClick = (productId) => {
    this.props.addToCart(productId);
    this.props.history.push("/cart");
  };

  render() {
    const { products, status, currentCurrency, cartProducts } = this.props;

    const product = products.find((product) => {
      if (!product) return false;
      return product.id === this.props.match.params.id;
    });

    if (!product) return <h1>product not found</h1>;

    if (status === "loading" || !currentCurrency) return <h1> Loading....</h1>;

    let isInCart;
    cartProducts.forEach((cartProduct) => {
      if (cartProduct.id === product.id) isInCart = true;
    });

    const productPrice = getPrice(product, currentCurrency);

    return (
      <section className="productdetails">
        <div className="productdetails__images">
          {product && this.renderSmallImages(product)}
        </div>
        <div className="productdetails__mainimage">
          {!product.inStock && (
            <span className="product__outofstock">
              <h3>OUT OF STOCK</h3>
            </span>
          )}
          <img
            src={`${product.gallery[this.state.mainImageIndex]}`}
            alt="t-shirt"
          />
        </div>
        <div className="productdetails__options">
          <div>
            <h3 className="productdetails__heading">{product.brand}</h3>
            <h4 className="productdetails__title">{product.name}</h4>
          </div>
          <Options
            attributes={product.attributes}
            productId={product.id}
            shouldNotChangeOptions
          />
          <div className="productdetails__price">
            <h4 className="productdetails__subtitle">PRICE: </h4>
            <p>
              {productPrice.currency.symbol} {productPrice.amount}
            </p>{" "}
          </div>
          {product.inStock ? (
            <button
              className="productdetails__addbtn"
              onClick={() => this.handleAddToCartClick(product.id)}
            >
              ADD TO CART
            </button>
          ) : (
            <button
              className="productdetails__addbtn productdetails__addbtnDisabled"
              disabled
            >
              ADD TO CART
            </button>
          )}
          <div className="productdetails__description">
            {parse(sanitizeHtml(product.description))}
          </div>
        </div>
      </section>
    );
  }
}
const mapStateToProps = (state) => {
  const { products, status } = state.products;
  const { currentCurrency } = state.currency;
  const { cart } = state;
  return {
    products,
    status,
    currentCurrency,
    cartProducts: cart,
  };
};
const actionCreators = {
  fetchProduct,
  addToCart,
};
export default connect(mapStateToProps, actionCreators)(ProductDetails);
