import React, { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  //przed ustawieniem do ls czy produkt istnieje
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    const { _id, name, priceNoDelivery, url } = product;

    const isProductInCart = cart.some((item) => item._id === _id);

    if (!isProductInCart) {
      const newProduct = {
        _id,
        name,
        priceNoDelivery,
        url,
        quantity: 1,
      };

      setCart((prevCart) => [...prevCart, newProduct]);
    }
  };

  const addQuantity = (product) => {
    const { _id } = product;

    const isProductInCart = cart.some((item) => item._id === _id);

    if (isProductInCart) {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item._id === _id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    }
  };

  const substractQuantity = (product) => {
    const { _id } = product;

    const isProductInCart = cart.some((item) => item._id === _id);

    if (isProductInCart) {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item._id === _id
            ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
            : item
        )
      );
    }
  };

  const addProducts = (product, value) => {
    const { _id, name, priceNoDelivery, url } = product;
    console.log(value);

    if (isNaN(value) || !Number.isInteger(value) || value < 0) {
      console.error("Invalid quantity value");
      return;
    }

    const isProductInCart = cart.some((item) => item._id === _id);

    if (isProductInCart) {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item._id === _id
            ? { ...item, quantity: Number(item.quantity) + value }
            : item
        )
      );
    } else {
      const newProduct = {
        _id,
        name,
        priceNoDelivery,
        url,
        quantity: value,
      };

      setCart((prevCart) => [...prevCart, newProduct]);
    }
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) =>
      prevCart.filter((product) => product._id !== productId)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        addQuantity,
        addProducts,
        substractQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
