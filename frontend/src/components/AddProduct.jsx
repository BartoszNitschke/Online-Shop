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
    <form
      onSubmit={handleSubmit}
      className="flex flex-col  items-center h-screen mt-[130px]"
    >
      <h3 className="text-[48px] font-semibold text-orange-500">
        Add Product:
      </h3>

      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
        placeholder="Product name"
        className="px-10 py-1 my-1  text-[14px] outline-none border-2 border-gray-700 rounded-xl"
      />

      <input
        type="text"
        onChange={(e) => setUrl(e.target.value)}
        value={url}
        placeholder="Product url"
        className="px-10 py-1 my-1  text-[14px] outline-none border-2 border-gray-700 rounded-xl"
      />

      <input
        type="number"
        onChange={(e) => setPriceNoDelivery(e.target.value)}
        value={priceNoDelivery}
        placeholder="Price"
        className="px-10 py-1 my-1  text-[14px] outline-none border-2 border-gray-700 rounded-xl"
      />

      <input
        type="number"
        onChange={(e) => setPriceDelivery(e.target.value)}
        value={priceDelivery}
        placeholder="Price with delivery"
        className="px-10 py-1 my-1  text-[14px] outline-none border-2 border-gray-700 rounded-xl"
      />

      <input
        type="text"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        placeholder="Description"
        className="px-10 py-1 my-1  text-[14px] outline-none border-2 border-gray-700 rounded-xl"
      />

      <input
        type="text"
        onChange={(e) => setBio(e.target.value)}
        value={bio}
        placeholder="Bio"
        className="px-10 py-1 my-1  text-[14px] outline-none border-2 border-gray-700 rounded-xl"
      />

      <input
        type="number"
        onChange={(e) => setQuantity(e.target.value)}
        value={quantity}
        placeholder="Quantity"
        className="px-10 py-1 my-1  text-[14px] outline-none border-2 border-gray-700 rounded-xl"
      />

      <label className="text-[24px] px-2  mt-5">
        Men:{" "}
        <input
          type="checkbox"
          onChange={(e) => setMen(e.target.checked)}
          checked={men}
          className="w-[20px] h-[20px] ml-2"
        />
      </label>

      <label className="text-[24px] px-2 ">
        Women:
        <input
          type="checkbox"
          onChange={(e) => setWomen(e.target.checked)}
          checked={women}
          className="w-[20px] h-[20px] ml-2"
        />
      </label>

      <label className="text-[24px] px-2 ">
        T-shirts:
        <input
          type="checkbox"
          onChange={(e) => setTshirt(e.target.checked)}
          checked={tshirt}
          className="w-[20px] h-[20px] ml-2"
        />
      </label>

      <label className="text-[24px] px-2 ">
        Pants:
        <input
          type="checkbox"
          onChange={(e) => setPants(e.target.checked)}
          checked={pants}
          className="w-[20px] h-[20px] ml-2"
        />
      </label>

      <label className="text-[24px] px-2 ">
        Shoes:
        <input
          type="checkbox"
          onChange={(e) => setShoes(e.target.checked)}
          checked={shoes}
          className="w-[20px] h-[20px] ml-2"
        />
      </label>

      <label className="text-[24px] px-2 ">
        Socks:
        <input
          type="checkbox"
          onChange={(e) => setSocks(e.target.checked)}
          checked={socks}
          className="w-[20px] h-[20px] ml-2"
        />
      </label>

      <button className="bg-orange-500 px-10 py-2 m-1 mt-2 font-bold text-[20px] rounded-xl ">
        Add product
      </button>
      {error && (
        <div className="w-[40%] mt-3 font-semibold text-red-600">{error}</div>
      )}
    </form>
  );
};

export default AddProduct;
