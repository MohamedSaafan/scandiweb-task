import { Component } from "react";

import circleIcon from "../../../../images/circle-icon.png";
import "./product.scss";
class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const props = this.props;
    return (
      <article
        className={`product ${props.outOfStock ? "product-outofstock" : ""}`}
      >
        {props.outOfStock ? (
          <span className="product__outofstock">
            {props.outOfStock ? <h3>OUT OF STOCK</h3> : ""}
          </span>
        ) : (
          ""
        )}
        <div className="product__header">
          <img src={props.image} alt="clothes" className="product__image" />
          <button className="product__cart">
            <img src={circleIcon} alt="cart" />
          </button>
        </div>

        <div className="product__details">
          <h4 className="product__title">Apollo Running Short</h4>
          <p className="product__price">$50.00</p>
        </div>
      </article>
    );
  }
}

export default Product;
