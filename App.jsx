import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductList from "./components/ProductList";
import RecommendationForm from "./components/RecommendationForm";
import "./styles.css";

function App() {
  const [products, setProducts] = useState([]);
  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/products`);
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, []);

  const getRecommendations = async (query) => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/recommend`, { query });
      setRecommended(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="App">
      <h1>🛒 AI Product Recommender</h1>
      <RecommendationForm onSubmit={getRecommendations} />
      <h2>All Products</h2>
      <ProductList products={products} />
      <h2>Recommended Products</h2>
      <ProductList products={recommended} />
    </div>
  );
}

export default App;
