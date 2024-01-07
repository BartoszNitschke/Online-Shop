import React, { useState, useEffect } from "react";
import ProductDetails from "../components/ProductDetails";

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
  }, [products]);

  return (
    <div>
      <div className="mt-[110px]">
        <img
          src="https://images.unsplash.com/photo-1508427953056-b00b8d78ebf5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="h-screen w-full object-cover"
          alt="mainpage"
        ></img>
        <div className="h-screen w-full flex justify-center items-center flex-col absolute left-0 top-0">
          <h1 className="text-orange-500 text-[64px] font-bold ">
            ADD SOME STYLE NOW
          </h1>
          <button className="bg-orange-500 px-12 py-4 text-white  rounded-lg text-[18px] font-semibold">
            SHOP NOW
          </button>
        </div>
        {products &&
          products.map((product) => {
            return <ProductDetails key={product._id} product={product} />;
          })}
      </div>
    </div>
  );
};

export default Home;
