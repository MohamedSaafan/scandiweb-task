import { Component } from "react";
import image from "../../images/Image.png";
import ColorChoices from "../color-choicer";
import SizesChoices from "../size-choicer";
import "./product-details.scss";
class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    console.log(this.props.match.params.id, "from params");
  }

  handleColorChange = (color) => {
    console.log(color, "this is the color from the parent component");
  };
  handleSizeChange = (size) => {
    console.log(size, "from size in the parent element");
  };
  render() {
    return (
      <section className="productdetails">
        <div className="productdetails__images">
          <div className="productdetails__images__wrapper">
            <img src={image} alt="clothes" />
          </div>
          <div className="productdetails__images__wrapper">
            <img src={image} alt="clothes" />
          </div>
          <div className="productdetails__images__wrapper">
            <img src={image} alt="clothes" />
          </div>
        </div>
        <div className="productdetails__mainimage">
          <img src={image} alt="t-shirt" />{" "}
        </div>
        <div className="productdetails__options">
          <div>
            <h3 className="productdetails__heading">Apollo</h3>
            <h4 className="productdetails__title">Running Short</h4>
          </div>
          <div className="productdetails__sizes">
            <h4 className="productdetails__subtitle">SIZE: </h4>
            <SizesChoices
              currentActiveSize="s"
              sizes={["s", "m", "l"]}
              handleSizeChange={this.handleSizeChange}
            />
          </div>
          <div className="productdetails__colors">
            <h4 className="productdetails__subtitle">COLOR: </h4>
            <ColorChoices
              currentActiveChoice="#D3D2D5"
              choices={["#D3D2D5", "#000000", "#0F6450"]}
              handleChoiceChange={this.handleColorChange}
            />
          </div>
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
export default ProductDetails;
