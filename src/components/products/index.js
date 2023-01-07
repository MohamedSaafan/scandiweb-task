import { Component } from "react";
import { connect } from "react-redux";
import ProductsList from "./components/products-list";
import "./products.scss";
class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { products, loadingStatus, activeCategory } = this.props;

    return (
      <section className="products">
        <h2 className="products__heading">{activeCategory}</h2>
        <ProductsList products={products} loadingStatus={loadingStatus} />
      </section>
    );
  }
}
const mapStateToProps = (state) => {
  const { activeCategory, categories, status } = state.categories;

  const activeCategoryDetails = categories.find(
    (category) => category.name === activeCategory
  );

  return {
    products: activeCategoryDetails?.products || [],
    loadingStatus: status,
    activeCategory,
  };
};
export default connect(mapStateToProps)(Products);
