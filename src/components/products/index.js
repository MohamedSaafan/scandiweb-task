import { Component } from "react";
import ProductsList from "./components/products-list";
import "./products.scss";
class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <section className="products">
        <h2 className="products__heading">Category name</h2>
        <ProductsList />
      </section>
    );
  }
}
export default Products;
