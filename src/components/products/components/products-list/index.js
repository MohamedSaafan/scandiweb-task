import { Component } from "react";
import Product from "../product";
import "./products-list.scss";
import clothesImage from "../../../../images/clothes.png";
import clothesImage2 from "../../../../images/clothes2.png";
import clothesImage3 from "../../../../images/clothes3.png";
import clothesImage1 from "../../../../images/Image.png";

class ProductsList extends Component {
  renderProducts = (products) => {
    return products.map((product) => (
      <Product key={product.id} product={product} />
    ));
  };
  render() {
    const { loadingStatus, products } = this.props;

    if (loadingStatus === "loading") {
      return <h2>Loading</h2>;
    }
    return (
      <div className="products-list">
        {products ? this.renderProducts(products) : ""}

        {/* <Product image={clothesImage1} />
        <Product image={clothesImage} />
        <Product image={clothesImage2} outOfStock />
        <Product image={clothesImage3} />
        <Product image={clothesImage1} />
        <Product image={clothesImage2} /> */}
      </div>
    );
  }
}
export default ProductsList;
