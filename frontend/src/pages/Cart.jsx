import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, setCart, addQuantity, substractQuantity, removeFromCart } =
    useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

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
    </div>
  );
};

export default Cart;
