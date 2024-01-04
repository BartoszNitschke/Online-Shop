import React, { useState, useEffect } from "react";
import ProductDetails from "../components/ProductDetails";
import AddProduct from "../components/AddProduct";

const Home = () => {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/products");
      const json = await res.json();

      if (res.ok) {
        setProducts(json);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <div>
        {products &&
          products.map((product) => {
            return <ProductDetails key={product._id} product={product} />;
          })}
      </div>
      <AddProduct />
    </div>
  );
};

export default Home;
