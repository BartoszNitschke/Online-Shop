import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import { IoIosRemove, IoIosAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";

const Cart = () => {
  const {
    cart,
    totalPrice,
    isFree,
    addQuantity,
    substractQuantity,
    removeFromCart,
  } = useContext(CartContext);

  const [productUnavailable, setProductUnavailable] = useState(false);
  useEffect(() => {
    const productNotAvailable = cart.find(
      (product) => product.quantity > product.quantityInStore
    );
    setProductUnavailable(!!productNotAvailable);
  }, [cart]);

  if (cart.length < 1) {
    return (
      <div className="h-screen w-full justify-center items-center flex">
        <h1 className="text-[48px] font-bold text-orange-500 after:content-['cart'] animate fadeDown">
          Add items to your{" "}
        </h1>
      </div>
    );
  }

  return (
    <div className="mt-[150px] flex flex-col h-screen w-[90%] mx-auto animate fadeDown">
      <h1 className="text-[48px] font-bold text-orange-500 pb-8 text-center">
        Cart
      </h1>
      {cart.map((product) => {
        return (
          <div className="flex  py-2 w-[80%]" key={product._id}>
            <Link to={"/product/" + product._id}>
              <img
                src={product.url}
                alt={product.name}
                className="w-[120px] h-[160px] object-cover rounded-md shadow-md shadow-black"
              />
            </Link>
            <div className="flex flex-col items-start px-4">
              <p className="text-[22px] text-orange-500 font-semibold">
                {product.name}
              </p>
              <p className="text-[18px] font-semibold">
                {product.priceNoDelivery} PLN x {product.quantity}
              </p>
              <div className="py-2">
                <button
                  onClick={() => addQuantity(product)}
                  className=" bg-orange-500 text-black text-[24px] px-4 py-1 rounded-lg hover:bg-orange-400"
                >
                  <IoIosAdd />
                </button>
                <button
                  onClick={() => substractQuantity(product)}
                  className="bg-orange-500 text-black text-[24px] px-4 py-1 rounded-lg hover:bg-orange-400 ml-2"
                >
                  <IoIosRemove />
                </button>
                <button
                  onClick={() => removeFromCart(product._id)}
                  className="bg-orange-500 text-black text-[24px] px-4 py-1 rounded-lg hover:bg-orange-400 ml-2 hover:text-white"
                >
                  <MdDelete />
                </button>
              </div>

              <p className="text-[18px] font-semibold">
                Total : {product.quantity * product.priceNoDelivery}
              </p>
              {product.quantity > product.quantityInStore && (
                <p className="text-center text-[20px] mt-4 py-2 text-red-600 font-semibold">
                  Product not available
                </p>
              )}
            </div>
          </div>
        );
      })}

      <div className="flex flex-col mt-12">
        <p className="text-[24px] text-black font-bold">
          Delivery:{" "}
          <span className="text-orange-500">
            {" "}
            {isFree ? "free" : "15 PLN"}{" "}
          </span>
        </p>
        <p className="text-[24px] text-black font-bold">
          Total Price:{" "}
          <span className="text-orange-500"> {totalPrice} PLN</span>
        </p>

        <Link to="/order">
          <button
            className={
              !productUnavailable
                ? "text-[22px] font-semibold bg-orange-500 rounded-2xl text-white px-16 py-2 mt-6 hover:bg-orange-400 hover:text-gray-700"
                : "text-[22px] font-semibold bg-gray-400 rounded-2xl text-black px-16 py-2 mt-6"
            }
            disabled={productUnavailable}
          >
            Complete order
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Cart;
