import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const {
    cart,
    setCart,
    totalPrice,
    setTotalPrice,
    addQuantity,
    substractQuantity,
    removeFromCart,
  } = useContext(CartContext);

  return (
    <div className="mt-[150px]">
      <h1>Cart</h1>
      {cart.map((product) => {
        return (
          <div className="flex">
            <Link to={"/product/" + product._id}>
              <img src={product.url} alt={product.name} className="w-[100px]" />
            </Link>
            <div className="flex flex-col items-start">
              <p>{product.name}</p>
              <p>{product.priceNoDelivery}</p>
              <p>{product.quantity}</p>
              <p>Total : {product.quantity * product.priceNoDelivery}</p>
              <button
                onClick={() => addQuantity(product)}
                className="border-2 border-black text-[20px] px-4 py-1"
              >
                +
              </button>
              <button
                onClick={() => substractQuantity(product)}
                className="border-2 border-black text-[20px] px-4 py-1"
              >
                -
              </button>
              <button
                onClick={() => removeFromCart(product._id)}
                className="border-2 border-black text-[20px] px-4 py-1"
              >
                Remove
              </button>
            </div>
          </div>
        );
      })}

      <p>Delivery: {totalPrice >= 250 ? "free" : "15 PLN"}</p>
      <p>Total price: {totalPrice}</p>
      {cart.length > 0 && (
        <Link to="/order">
          <button className="border-2 border-black text-[20px] px-4 py-1">
            Complete order
          </button>
        </Link>
      )}
    </div>
  );
};

export default Cart;
