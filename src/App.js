import "../node_modules/font-awesome/css/font-awesome.min.css";
import "./App.css";
import "font-awesome/css/font-awesome.min.css";
import React from "react";
import {
  BrowserRouter,
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import ProductsList from "./components/products-list";
import Cart from "./components/cart";
import Navbar from "./components/navbar";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Navbar />

        <main className="main">
          <Routes>
            <Route path="/" element={<ProductsList />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </main>
      </BrowserRouter>
    );
  }
}

export default App;
