import React, { useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { useUserContext } from "../hooks/useUserContext";
import { useFormik } from "formik";
import * as yup from "yup";

const phoneRegex = /^\+?\d{9,15}$/;

const basicSchema = yup.object().shape({
  name: yup.string().required().min(4).max(50),
  lastName: yup.string().required().min(2).max(50),
  email: yup.string().email().required(),
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
  email: yup.string().email().required(),
  phoneNumber: yup
    .string()
    .required()
    .matches(phoneRegex, { message: "Phone number must have 9-15 numbers" }),
  inpostCode: yup.string().required().min(4).max(6),
});

const Order = () => {
  const { cart, totalPrice, clearCart } = useContext(CartContext);
  const { user } = useUserContext();

  const onSubmit = async (values, actions) => {
    console.log("siemano");
    console.log(cart);
    console.log(values);
    actions.resetForm();

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

    const res = await fetch("/api/orders", {
      method: "POST",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await res.json();

    if (!res.ok) {
      throw Error("couldnt add an order");
    }

    if (res.ok) {
      console.log("new order added", json);
      clearCart();
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

  return (
    <div className="mt-[150px]">
      <h1>Order</h1>
      <p>{totalPrice}</p>

      <form onSubmit={handleSubmit} autoComplete="off" className="formikForm">
        <label>
          Name:
          <input
            value={values.name}
            onChange={handleChange}
            id="name"
            type="text"
            onBlur={handleBlur}
            className={errors.name && touched.name ? "input-error" : ""}
          />
          {errors.name && touched.name && (
            <p className="error">{errors.name}</p>
          )}
        </label>
        <label>
          Last Name:
          <input
            value={values.lastName}
            onChange={handleChange}
            id="lastName"
            type="text"
            onBlur={handleBlur}
            className={errors.lastName && touched.lastName ? "input-error" : ""}
          />
          {errors.lastName && touched.lastName && (
            <p className="error">{errors.lastName}</p>
          )}
        </label>

        <label>
          Email:
          <input
            value={values.email}
            onChange={handleChange}
            id="email"
            type="email"
            onBlur={handleBlur}
            className={errors.email && touched.email ? "input-error" : ""}
          />
          {errors.email && touched.email && (
            <p className="error">{errors.email}</p>
          )}
        </label>

        <label>
          Street:
          <input
            value={values.street}
            onChange={handleChange}
            id="street"
            type="text"
            onBlur={handleBlur}
            className={errors.street && touched.street ? "input-error" : ""}
          />
          {errors.street && touched.street && (
            <p className="error">{errors.street}</p>
          )}
        </label>

        <label>
          Number:
          <input
            value={values.homeNumber}
            onChange={handleChange}
            id="homeNumber"
            type="number"
            onBlur={handleBlur}
            className={
              errors.homeNumber && touched.homeNumber ? "input-error" : ""
            }
          />
          {errors.homeNumber && touched.homeNumber && (
            <p className="error">{errors.homeNumber}</p>
          )}
        </label>

        <label>
          Zip code:
          <input
            value={values.zipCode}
            onChange={handleChange}
            id="zipCode"
            type="text"
            onBlur={handleBlur}
            className={errors.zipCode && touched.zipCode ? "input-error" : ""}
          />
          {errors.zipCode && touched.zipCode && (
            <p className="error">{errors.zipCode}</p>
          )}
        </label>

        <label>
          Country:
          <input
            value={values.country}
            onChange={handleChange}
            id="country"
            type="text"
            onBlur={handleBlur}
            className={errors.country && touched.country ? "input-error" : ""}
          />
          {errors.country && touched.country && (
            <p className="error">{errors.country}</p>
          )}
        </label>

        <label>
          Phone Number:
          <input
            value={values.phoneNumber}
            onChange={handleChange}
            id="phoneNumber"
            type="text"
            onBlur={handleBlur}
            className={
              errors.phoneNumber && touched.phoneNumber ? "input-error" : ""
            }
          />
          {errors.phoneNumber && touched.phoneNumber && (
            <p className="error">{errors.phoneNumber}</p>
          )}
        </label>

        <button disabled={isSubmitting} type="submit">
          Submit
        </button>
      </form>

      <form onSubmit={ipHandleSubmit} autoComplete="off">
        <label>
          Email:
          <input
            value={ipValues.email}
            onChange={ipHandleChange}
            id="email"
            type="email"
            onBlur={ipHandleBlur}
            className={ipErrors.email && ipTouched.email ? "input-error" : ""}
          />
          {ipErrors.email && ipTouched.email && (
            <p className="error">{ipErrors.email}</p>
          )}
        </label>

        <label>
          Phone Number:
          <input
            value={ipValues.phoneNumber}
            onChange={ipHandleChange}
            id="phoneNumber"
            type="text"
            onBlur={ipHandleBlur}
            className={
              ipErrors.phoneNumber && ipTouched.phoneNumber ? "input-error" : ""
            }
          />
          {ipErrors.phoneNumber && ipTouched.phoneNumber && (
            <p className="error">{ipErrors.phoneNumber}</p>
          )}
        </label>

        <label>
          InPost Code:
          <input
            value={ipValues.inpostCode}
            onChange={ipHandleChange}
            id="inpostCode"
            type="text"
            onBlur={ipHandleBlur}
            className={
              ipErrors.inpostCode && ipTouched.inpostCode ? "input-error" : ""
            }
          />
          {ipErrors.inpostCode && ipTouched.inpostCode && (
            <p className="error">{ipErrors.inpostCode}</p>
          )}
        </label>

        <button disabled={ipIsSubmitting} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Order;
