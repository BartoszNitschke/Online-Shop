import React, { useState } from "react";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [priceNoDelivery, setPriceNoDelivery] = useState("");
  const [priceDelivery, setPriceDelivery] = useState("");
  const [description, setDescription] = useState("");
  const [bio, setBio] = useState("");
  const [quantity, setQuantity] = useState("");
  const [men, setMen] = useState(false);
  const [women, setWomen] = useState(false);
  const [tshirt, setTshirt] = useState(false);
  const [pants, setPants] = useState(false);
  const [shoes, setShoes] = useState(false);
  const [socks, setSocks] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = {
      name,
      url,
      priceNoDelivery,
      priceDelivery,
      description,
      bio,
      quantity,
      men,
      women,
      tshirt,
      pants,
      shoes,
      socks,
    };

    const res = await fetch("/api/products", {
      method: "POST",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
      },
    });

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
      setBio("");
      setQuantity("");
      setMen(false);
      setWomen(false);
      setTshirt(false);
      setPants(false);
      setShoes(false);
      setSocks(false);
      console.log("new product added", json);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="mt-[200px]">Add Product:</h3>
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

      <label>Product bio (longer):</label>
      <input type="text" onChange={(e) => setBio(e.target.value)} value={bio} />

      <label>Product quantity:</label>
      <input
        type="number"
        onChange={(e) => setQuantity(e.target.value)}
        value={quantity}
      />

      <label>Men:</label>
      <input
        type="checkbox"
        onChange={(e) => setMen(e.target.checked)}
        checked={men}
      />

      <label>Women:</label>
      <input
        type="checkbox"
        onChange={(e) => setWomen(e.target.checked)}
        checked={women}
      />

      <label>T-shirts: :</label>
      <input
        type="checkbox"
        onChange={(e) => setTshirt(e.target.checked)}
        checked={tshirt}
      />

      <label>Pants:</label>
      <input
        type="checkbox"
        onChange={(e) => setPants(e.target.checked)}
        checked={pants}
      />

      <label>Shoes:</label>
      <input
        type="checkbox"
        onChange={(e) => setShoes(e.target.checked)}
        checked={shoes}
      />

      <label>Socks:</label>
      <input
        type="checkbox"
        onChange={(e) => setSocks(e.target.checked)}
        checked={socks}
      />

      <button>Add product</button>
      {error && <div>{error}</div>}
    </form>
  );
};

export default AddProduct;
