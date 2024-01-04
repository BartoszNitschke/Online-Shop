import React from "react";

const ProductDetails = ({ product }) => {
  const handleDelete = async () => {
    const res = await fetch("/api/products/" + product._id, {
      method: "DELETE",
    });

    const json = await res.json();

    if (!res.ok) {
      console.log(json.error);
    }

    if (res.ok) {
      console.log(product.name + "has been deleted");
    }
  };

  return (
    <div>
      <img src={product.url} style={{ width: "200px" }} alt={product.name} />
      <h2>{product.name}</h2>
      <h4>Price: {product.priceNoDelivery}</h4>
      <h4>Price With Delivery: {product.priceDelivery}</h4>
      <h5>Description: {product.description}</h5>
      <h5>Bio: {product.bio}</h5>
      <h4>Quantity: {product.quantity}</h4>
      <button onClick={handleDelete}> Delete</button>
    </div>
  );
};

export default ProductDetails;
