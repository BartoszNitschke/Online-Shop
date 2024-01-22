import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useUserContext } from "../hooks/useUserContext";
import { useFormik } from "formik";

import * as yup from "yup";

const phoneRegex = /^\+?\d{9,15}$/;

const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;

const basicSchema = yup.object().shape({
  name: yup.string().required().min(4).max(50),
  lastName: yup.string().required().min(2).max(50),
  email: yup.string().email().required().matches(emailRegex, "Invalid email"),
  street: yup.string().required().min(3).max(30),
  homeNumber: yup.number().required().min(1),
  zipCode: yup.string().required().min(5).max(6),
  country: yup.string().required().min(2).max(50),
  phoneNumber: yup
    .string()
    .required()
    .matches(phoneRegex, { message: "Phone number must have 9-15 numbers" }),
});

const inPostSchema = yup.object().shape({
  email: yup.string().email().required().matches(emailRegex, "Invalid email"),
  phoneNumber: yup
    .string()
    .required()
    .matches(phoneRegex, { message: "Phone number must have 9-15 numbers" }),
  inpostCode: yup.string().required().min(4).max(6),
});

const Order = () => {
  const { cart, totalPrice, setTotalPrice, isFree, clearCart } =
    useContext(CartContext);
  const [modal, setModal] = useState(false);
  const [inPostModal, setInPostModal] = useState(false);
  const [method, setMethod] = useState("inpost");
  const { user } = useUserContext();
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(null);

  const showModal = () => {
    setModal(!modal);
  };

  const onSubmit = async (values, actions) => {
    if (cart.length <= 0) {
      throw Error("Impossible action!");
    }

    console.log("siemano");
    console.log(cart);
    console.log(values);

    let product = {};

    if (user) {
      product = {
        userId: user._id,
        products: cart.map(({ url, ...rest }) => rest),
        totalPrice,
      };
    } else {
      product = {
        userId: "",
        products: cart.map(({ url, ...rest }) => rest),
        totalPrice,
      };
    }

    const patchRes = await fetch("/api/products", {
      method: "PATCH",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!patchRes.ok) {
      setError("Couldn't add an order");
    }

    if (patchRes.ok) {
      setError(null);
      const res = await fetch("/api/orders", {
        method: "POST",
        body: JSON.stringify(product),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await res.json();

      if (!res.ok) {
        setError("Couldn't add an order");
      }

      if (res.ok) {
        console.log("new order added", json);
        actions.resetForm();
        clearCart();
        showModal();
        setError(null);
        setRedirect(true);

        if (redirect) {
          return redirect("/");
        }
      }
    }
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      name: "",
      lastName: "",
      email: "",
      street: "",
      homeNumber: "",
      zipCode: "",
      country: "",
      phoneNumber: "",
    },
    validationSchema: basicSchema,
    onSubmit,
  });

  const {
    values: ipValues,
    errors: ipErrors,
    touched: ipTouched,
    isSubmitting: ipIsSubmitting,
    handleBlur: ipHandleBlur,
    handleChange: ipHandleChange,
    handleSubmit: ipHandleSubmit,
  } = useFormik({
    initialValues: {
      email: "",
      phoneNumber: "",
      inpostCode: "",
    },
    validationSchema: inPostSchema,
    onSubmit,
  });

  const toggleMethod = () => {
    if (method === "inpost") {
      setMethod("delivery");
      if (!isFree) {
        setTotalPrice(totalPrice + 5);
      }
    } else {
      setMethod("inpost");
      if (!isFree) {
        setTotalPrice(totalPrice - 5);
      }
    }
  };

  return (
    <div className="mt-[150px] min-h-screen flex flex-col items-center animate fadeDown">
      <h1 className="text-[48px] font-bold text-orange-500  text-center">
        Order
      </h1>
      <p className="text-[32px] font-bold text-orange-500 mt-3 text-center">
        Total price: {totalPrice} PLN
      </p>
      <div className="flex mt-3">
        <button
          className={
            method === "inpost"
              ? "bg-orange-500 px-6 py-2 m-1 font-bold text-[20px] rounded-xl"
              : "bg-gray-400 px-6 py-2 m-1 font-bold text-[20px] rounded-xl"
          }
          onClick={() => toggleMethod()}
        >
          InPost
        </button>
        <button
          className={
            method === "delivery"
              ? "bg-orange-500 px-6 py-2 m-1 font-bold text-[20px] rounded-xl"
              : "bg-gray-400 px-6 py-2 m-1 font-bold text-[20px] rounded-xl"
          }
          onClick={() => toggleMethod()}
        >
          Delivery {isFree ? "" : "(+ 5 PLN )"}
        </button>
      </div>

      {method === "delivery" && (
        <form
          onSubmit={handleSubmit}
          autoComplete="off"
          className="flex flex-col mt-8 font-semibold "
        >
          <div className="flex">
            <div className="flex flex-col">
              <input
                value={values.name}
                onChange={handleChange}
                id="name"
                type="text"
                onBlur={handleBlur}
                className="px-5 py-2 my-2 mr-1 text-[18px] outline-none border-2 border-gray-700 rounded-lg"
                placeholder="Name"
              />
              {errors.name && touched.name && (
                <p className=" text-center text-red-600 font-bold">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <input
                value={values.lastName}
                onChange={handleChange}
                id="lastName"
                type="text"
                onBlur={handleBlur}
                className="px-5 py-2 my-2 ml-1 text-[18px] outline-none border-2 border-gray-700 rounded-lg"
                placeholder="Last name"
              />
              {errors.lastName && touched.lastName && (
                <p className=" text-center text-red-600 font-bold">
                  {errors.lastName}
                </p>
              )}
            </div>
          </div>

          <input
            value={values.email}
            onChange={handleChange}
            id="email"
            type="email"
            onBlur={handleBlur}
            className="px-5 py-2 my-2 text-[18px] outline-none border-2 border-gray-700 rounded-lg"
            placeholder="Email address"
          />
          {errors.email && touched.email && (
            <p className="text-center text-red-600 font-bold">{errors.email}</p>
          )}

          <input
            value={values.street}
            onChange={handleChange}
            id="street"
            type="text"
            onBlur={handleBlur}
            className="px-5 py-2 my-2 text-[18px] outline-none border-2 border-gray-700 rounded-lg"
            placeholder="Street"
          />
          {errors.street && touched.street && (
            <p className=" text-center text-red-600 font-bold">
              {errors.street}
            </p>
          )}

          <div className="flex ">
            <div className="flex flex-col">
              <input
                value={values.homeNumber}
                onChange={handleChange}
                id="homeNumber"
                type="number"
                onBlur={handleBlur}
                className="px-5 py-2 my-2 mr-1 text-[18px] outline-none border-2 border-gray-700 rounded-lg"
                placeholder="Home number"
              />
              {errors.homeNumber && touched.homeNumber && (
                <p className=" text-center text-red-600 font-bold">
                  {errors.homeNumber}
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <input
                value={values.zipCode}
                onChange={handleChange}
                id="zipCode"
                type="text"
                onBlur={handleBlur}
                className="px-5 py-2 my-2 ml-1 text-[18px] outline-none border-2 border-gray-700 rounded-lg"
                placeholder="Zip code"
              />
              {errors.zipCode && touched.zipCode && (
                <p className=" text-center text-red-600 font-bold">
                  {errors.zipCode}
                </p>
              )}
            </div>
          </div>

          <input
            value={values.country}
            onChange={handleChange}
            id="country"
            type="text"
            onBlur={handleBlur}
            className="px-5 py-2 my-2 text-[18px] outline-none border-2 border-gray-700 rounded-lg"
            placeholder="Country"
          />
          {errors.country && touched.country && (
            <p className=" text-center text-red-600 font-bold">
              {errors.country}
            </p>
          )}

          <input
            value={values.phoneNumber}
            onChange={handleChange}
            id="phoneNumber"
            type="text"
            onBlur={handleBlur}
            className="px-5 py-2 my-2 text-[18px] outline-none border-2 border-gray-700 rounded-lg"
            placeholder="Phone number"
          />
          {errors.phoneNumber && touched.phoneNumber && (
            <p className=" text-center text-red-600 font-bold">
              {errors.phoneNumber}
            </p>
          )}

          <button
            className="bg-orange-500 px-10 py-2 m-1 mt-4 font-bold text-[20px] rounded-xl w-[45%] mx-auto"
            type="button"
            onClick={() => showModal()}
          >
            Order
          </button>

          {modal && (
            <div className="flex flex-col items-center mt-6">
              <p className="text-[18px] font-semibold">
                Confirm your order below
              </p>
              <button
                disabled={isSubmitting}
                type="submit"
                className="bg-orange-500 px-10 py-2 m-1 font-bold text-[20px] rounded-xl"
              >
                Confirm order
              </button>
            </div>
          )}
          {error && (
            <p className="text-center text-[20px] mt-4 py-2 text-red-600 font-semibold"></p>
          )}
        </form>
      )}

      {method === "inpost" && (
        <form
          onSubmit={ipHandleSubmit}
          autoComplete="off"
          className="flex flex-col mt-12 font-semibold items-center"
        >
          <input
            value={ipValues.email}
            onChange={ipHandleChange}
            id="email"
            type="email"
            onBlur={ipHandleBlur}
            className="px-5 py-2 my-2 text-[18px] outline-none border-2 border-gray-700 rounded-lg"
            placeholder="Email address"
          />
          {ipErrors.email && ipTouched.email && (
            <p className="py-1 text-center text-red-600 font-bold">
              {ipErrors.email}
            </p>
          )}

          <input
            value={ipValues.phoneNumber}
            onChange={ipHandleChange}
            id="phoneNumber"
            type="text"
            onBlur={ipHandleBlur}
            className="px-5 py-2 my-2 text-[18px] outline-none border-2 border-gray-700 rounded-lg"
            placeholder="Phone number"
          />
          {ipErrors.phoneNumber && ipTouched.phoneNumber && (
            <p className="py-1 text-center text-red-600 font-bold">
              {ipErrors.phoneNumber}
            </p>
          )}

          <input
            value={ipValues.inpostCode}
            onChange={ipHandleChange}
            id="inpostCode"
            type="text"
            onBlur={ipHandleBlur}
            className="px-5 py-2 my-2 text-[18px] outline-none border-2 border-gray-700 rounded-lg"
            placeholder="Inpost code"
          />
          {ipErrors.inpostCode && ipTouched.inpostCode && (
            <p className="py-1 text-center text-red-600 font-bold">
              {ipErrors.inpostCode}
            </p>
          )}

          <button
            type="button"
            className="bg-orange-500 px-10 py-2 m-1 font-bold text-[20px] rounded-xl"
            onClick={() => setInPostModal(!inPostModal)}
          >
            Order
          </button>
          {inPostModal && (
            <div className="flex flex-col items-center mt-6">
              <p className="text-[18px] font-semibold">
                Confirm your order below
              </p>
              <button
                disabled={ipIsSubmitting}
                type="submit"
                className="bg-orange-500 px-10 py-2 m-1 font-bold text-[20px] rounded-xl"
              >
                Confirm order
              </button>
            </div>
          )}
          {error && (
            <p className="text-center text-[20px] mt-4 py-2 text-red-600 font-semibold">
              {error}
            </p>
          )}
        </form>
      )}
    </div>
  );
};

export default Order;
