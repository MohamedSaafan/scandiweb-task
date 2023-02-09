import { Component } from "react";
import {
  fetchProduct,
  selectActiveProductAttribute,
} from "../../redux/actions/creators/prodcuts";
import { addToCart } from "../../redux/actions/creators/cart";
import "./product-details.scss";
import { connect } from "react-redux";
import { getPrice } from "../../helpers/getPrice";
import Options from "../options";
import parse from "html-react-parser";
import * as sanitizeHtml from "sanitize-html";
class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mainImageIndex: 0,
      productAttributes: [],
      product: null,
      initalizedProductAttributes: false,
    };
  }

  componentDidMount() {
    this.props.fetchProduct(this.props.match.params.id);
  }

  handleSmallImageClick = (index) => {
    this.setState({ mainImageIndex: index });
  };

  renderSmallImages = (product) => {
    let gallery = product.gallery;

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
    this.props.addToCart(productId, this.props.activeProduct.attributes);
    this.props.history.push("/cart");
  };
  selectAttribute = (attributeId, itemId) => {
    this.props.selectActiveProductAttribute(attributeId, itemId);
  };

  render() {
    const { activeProduct: product, status, currentCurrency } = this.props;

    if (status === "loading" || !currentCurrency) return <h1> Loading....</h1>;
    if (!product) return <h1>product not found</h1>;

    // let isInCart;
    // cartProducts.forEach((cartProduct) => {
    //   if (cartProduct.id === product.id) isInCart = true;
    // });

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
            attributes={[...product.attributes]}
            productId={product.id}
            selectAttribute={this.selectAttribute}
            shouldNotChangeOptions={product.inStock ? false : true}
          />
          <div className="productdetails__price">
            <h4 className="productdetails__subtitle">PRICE: </h4>
            <p>
              {productPrice.currency.symbol} {productPrice.amount.toFixed(2)}
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
  const { products, status, activeProduct } = state.products;
  const { currentCurrency } = state.currency;
  const { cart } = state;
  return {
    products,
    activeProduct,
    status,
    currentCurrency,
    cartProducts: cart,
  };
};
const actionCreators = {
  fetchProduct,
  addToCart,
  selectActiveProductAttribute,
};
export default connect(mapStateToProps, actionCreators)(ProductDetails);
