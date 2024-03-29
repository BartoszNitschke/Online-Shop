import React, { useState, useLayoutEffect } from "react";
import Product from "../components/Product";
import { Link } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface ProductType {
  _id: string;
  name: string;
  description: string;
  priceNoDelivery: number;
  quantity: number;
  url: string;
}

const HomeSection: React.FC = () => {
  const [products, setProducts] = useState<ProductType[] | null>(null);

  useLayoutEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/products/rating");
      const json = await res.json();

      if (res.ok) {
        setProducts(json);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <div className="mt-[110px] pb-[100px]">
        <img
          src="https://images.unsplash.com/photo-1508427953056-b00b8d78ebf5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="h-screen w-full object-cover"
          alt="mainpage"
        ></img>
        <div className="h-screen w-full flex justify-center items-center flex-col absolute left-0 top-0">
          <h1 className="text-orange-500 text-[64px] font-bold ">
            ADD SOME STYLE NOW
          </h1>
          <Link to="/products">
            <button className="bg-orange-500 px-12 py-4 text-white  rounded-lg text-[18px] font-semibold">
              SHOP NOW
            </button>
          </Link>
        </div>
        <div className="flex flex-col justify-center items-center">
          <h1 className="font-bold text-[48px] py-8 text-orange-500">
            Our best products
          </h1>
          <div className="flex flex-wrap justify-center">
            {!products && (
              <div className="h-[500px] w-full flex justify-center items-center">
                <AiOutlineLoading3Quarters className="text-[64px] animate-spin" />
              </div>
            )}
            {products &&
              products.slice(0, 5).map((product) => {
                return <Product key={product._id} product={product} />;
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSection;
