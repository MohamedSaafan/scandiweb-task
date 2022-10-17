import image from "../../../../images/Image.png";
import { Component } from "react";
import ColorChoices from "../../../color-choicer";
import SizesChoices from "../../../option-choicer";
import "./cart-product.scss";
class CartProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSizeChange = (size) => {
    console.log(size, "from size changed in the product cart component");
  };
  handleColorChange = (color) => {
    console.log(color, " from color change inside the product cart component");
  };

  render() {
    return (
      <div className="cart__product">
        <div className="cart__product__left">
          {" "}
          <h2 className="cart__product__heading">Apollo</h2>
          <h3 className="cart__product__title">Running Short</h3>
          <p className="cart__product__price">$50.00</p>
          <div className="cart__product__sizes">
            <h4 className="cart__product__subtitle">SIZE:</h4>
            <SizesChoices handleSizeChange={this.handleSizeChange} />
          </div>
          <div className="cart__product__sizes">
            <h4 className="cart__product__subtitle">COLOR:</h4>
            <ColorChoices handleColorChange={this.handleColorChange} />
          </div>
        </div>
        <div className="cart__product__right">
          <div className="cart__product__btns">
            <button>+</button>
            <p>1</p> <button>-</button>
          </div>
          <div className="cart__product__image">
            <img src={image} alt="clothes" />
            <div className="cart__product__arrows">
              <button className="cart__product__arrow">{"<"}</button>
              <button className="cart__product__arrow">{">"}</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CartProduct;
