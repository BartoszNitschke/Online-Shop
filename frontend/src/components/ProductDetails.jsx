import React from "react";

const ProductDetails = ({ product }) => {
  return (
    <div>
      <img src={product.url} style={{ width: "200px" }} />
      <h2>{product.name}</h2>
      <h4>Price: {product.priceNoDelivery}</h4>
      <h4>Price With Delivery: {product.priceDelivery}</h4>
      <h5>Description: {product.description}</h5>
      <h4>Quantity: {product.quantity}</h4>
    </div>
  );
};

export default ProductDetails;
