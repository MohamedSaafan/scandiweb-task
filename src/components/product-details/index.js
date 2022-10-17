import { Component } from "react";
import ColorChoices from "../color-choicer";
import SizesChoices from "../option-choicer";
import { fetchProduct } from "../../redux/actions/creators/prodcuts";
import "./product-details.scss";
import { connect } from "react-redux";
import OptionChoicer from "../option-choicer";
class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { mainImageIndex: 0 };
  }
  componentDidMount() {
    this.props.fetchProduct(this.props.match.params.id);
  }
  componentDidUpdate() {}

  handleColorChange = (color) => {
    console.log(color, "this is the color from the parent component");
  };
  handleSizeChange = (size) => {
    console.log(size, "from size in the parent element");
  };

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

  handleColorChange = (color) => {
    console.log(color);
  };

  renderOptions = (attributes) => {
    return attributes.map((attribute) => {
      if (attribute.type === "swatch")
        return (
          <ColorChoices
            choices={attribute.items}
            id={attribute.id}
            currentActiveChoice={attribute.items[0]}
            handleColorChange={this.handleColorChange}
            key={attribute.id}
          />
        );

      return (
        <OptionChoicer
          options={attribute.items}
          title={attribute.name}
          id={attribute.id}
          key={attribute.id}
        />
      );
    });
  };
  render() {
    const { products, status } = this.props;
    console.log(products);
    console.log(products, status);
    products.forEach((product) => {
      console.log(product.id, this.props.match.params.id);
    });
    const product = products.find(
      (product) => product.id === this.props.match.params.id
    );
    console.log(product, "from product");

    if (status === "loading" || !product) return <h1> Loading....</h1>;

    return (
      <section className="productdetails">
        <div className="productdetails__images">
          {product && this.renderSmallImages(product)}
        </div>
        <div className="productdetails__mainimage">
          <img
            src={`${product.gallery[this.state.mainImageIndex]}`}
            alt="t-shirt"
          />
        </div>
        <div className="productdetails__options">
          <div>
            <h3 className="productdetails__heading">Apollo</h3>
            <h4 className="productdetails__title">Running Short</h4>
          </div>
          <div className="productdetails__sizes">
            {this.renderOptions(product.attributes)}
          </div>
          <div className="productdetails__colors"></div>
          <div className="productdetails__price">
            <h4 className="productdetails__subtitle">PRICE: </h4>
            <p>$50.00</p>{" "}
          </div>
          <button className="productdetails__addbtn">ADD TO CART</button>
          <p className="productdetails__description">
            Find stunning women's cocktail dresses and party dresses. Stand out
            in lace and metallic cocktail dresses and party dresses from all
            your favorite brands.
          </p>
        </div>
      </section>
    );
  }
}
const mapStateToProps = (state) => {
  const { products, status } = state.products;
  return {
    products,
    status,
  };
};
const actionCreators = {
  fetchProduct,
};
export default connect(mapStateToProps, actionCreators)(ProductDetails);
