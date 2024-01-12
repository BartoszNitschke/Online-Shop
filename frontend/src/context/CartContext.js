import React, { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const [totalPrice, setTotalPrice] = useState(0);

  //przed ustawieniem do ls czy produkt istnieje
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async (id) => {
      try {
        const res = await fetch("/api/products/" + id);
        const json = await res.json();

        if (res.ok) {
          const isProductInArray = products.find(
            (product) => product._id === json._id
          );

          if (!isProductInArray) {
            setProducts((prevProducts) => [...prevProducts, json]);
          }
        } else {
          console.error(`Error fetching product with ID: ${id}`);
          setCart((prevCart) =>
            prevCart.filter((product) => product._id !== id)
          );
        }
      } catch (error) {
        console.error(`Error fetching product with ID: ${id}`, error);
        setCart((prevCart) => prevCart.filter((product) => product._id !== id));
      }
    };

    cart.forEach((product) => {
      fetchProducts(product._id);
    });

    const total = cart.reduce((acc, currentProduct) => {
      const productInCart = products.find(
        (product) => product._id === currentProduct._id
      );

      if (productInCart) {
        acc += productInCart.priceNoDelivery * currentProduct.quantity;
      }

      return acc;
    }, 0);

    if (total >= 250) {
      setTotalPrice(total);
    } else {
      setTotalPrice(total + 15);
    }
  }, [cart, products]);

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
        totalPrice,
        setTotalPrice,
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
