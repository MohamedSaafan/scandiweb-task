import "../node_modules/font-awesome/css/font-awesome.min.css";
import "./App.css";
import "font-awesome/css/font-awesome.min.css";
import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Cart from "./components/cart";
import Navbar from "./components/navbar";
import Products from "./components/products";
import ProductDetails from "./components/product-details";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Navbar />
        <main className="main">
          <Switch>
            <Route path="/products" exact component={Products} />
            <Route path="/products/:id" component={ProductDetails} />
            <Route path="/cart" component={Cart} />
            <Redirect to="/products" />
          </Switch>
        </main>
      </BrowserRouter>
    );
  }
}

export default App;
