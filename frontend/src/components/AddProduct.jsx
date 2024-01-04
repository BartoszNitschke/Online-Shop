import React, { useState } from "react";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [priceNoDelivery, setPriceNoDelivery] = useState("");
  const [priceDelivery, setPriceDelivery] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = {
      name,
      url,
      priceNoDelivery,
      priceDelivery,
      description,
      quantity,
    };

    const res = await fetch("/api/products", {
      method: "POST",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(JSON.stringify(product));
    const json = await res.json();

    if (!res.ok) {
      setError(json.error);
    }

    if (res.ok) {
      setError(null);
      setName("");
      setUrl("");
      setPriceNoDelivery("");
      setPriceDelivery("");
      setDescription("");
      setQuantity("");
      console.log("new product added", json);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Product:</h3>
      <label>Product name:</label>
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />

      <label>Product photo:</label>
      <input type="text" onChange={(e) => setUrl(e.target.value)} value={url} />

      <label>Product price without delivery:</label>
      <input
        type="number"
        onChange={(e) => setPriceNoDelivery(e.target.value)}
        value={priceNoDelivery}
      />

      <label>Product price with delivery:</label>
      <input
        type="number"
        onChange={(e) => setPriceDelivery(e.target.value)}
        value={priceDelivery}
      />

      <label>Product description:</label>
      <input
        type="text"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      />

      <label>Product quantity:</label>
      <input
        type="number"
        onChange={(e) => setQuantity(e.target.value)}
        value={quantity}
      />

      <button>Add product</button>
      {error && <div>{error}</div>}
    </form>
  );
};

export default AddProduct;
