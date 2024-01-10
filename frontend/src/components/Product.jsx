import React from "react";
import { FaCartPlus, FaSearchPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  return (
    <div className="flex flex-col max-w-[300px]  items-center  rounded-lg m-3">
      <img
        src={product.url}
        style={{ width: "300px", height: "450px", objectFit: "cover" }}
        alt={product.name}
        className=""
      />
      <div className="text-center">
        <h1 className="font-bold text-[24px] text-orange-500 pt-1">
          {product.name}
        </h1>
        <div className="flex justify-evenly text-[18px] font-semibold py-1">
          <h1>{product.priceNoDelivery} PLN</h1>
          <h1>{product.priceDelivery} PLN with Delivery</h1>
        </div>
        <h5>{product.description}</h5>
        <h4 className="font-semibold text-[18px] ">
          {product.quantity} in stock!
        </h4>
      </div>
      <div className="absolute flex justify-center items-center h-[450px] w-[300px] opacity-0 hover:opacity-100 transition-opacity bg-black-rgba">
        <button>
          <FaCartPlus className="text-[72px] text-orange-500 px-3 hover:text-gray-300" />
        </button>
        <Link to={"/product/" + product._id}>
          <FaSearchPlus className="text-[72px] text-orange-500 px-3 hover:text-gray-300" />
        </Link>
      </div>
    </div>
  );
};

export default Product;
