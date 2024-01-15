import React, { useState } from "react";
import { useSignup } from "../hooks/useSignup";

export const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignup();

  const handleSignUp = async (e) => {
    e.preventDefault();

    await signup(email, name, password);
    console.log(email, name, password);
  };

  return (
    <form
      className="flex flex-col justify-center items-center h-screen"
      onSubmit={handleSignUp}
    >
      <h2 className="text-[48px] font-bold text-orange-500">Sign up</h2>

      <input
        type="text"
        onChange={(e) => {
          setName(e.target.value);
        }}
        value={name}
        placeholder="Username"
        className="text-[22px] font-semibold px-7 py-2 mt-10 outline-none border-2 border-orange-400 rounded-md"
      />

      <input
        type="email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        value={email}
        placeholder="Email address"
        className="text-[22px] font-semibold px-7 py-2 mt-5 outline-none border-2 border-orange-400 rounded-md"
      />

      <input
        type="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        value={password}
        placeholder="Password"
        className="text-[22px] font-semibold px-7 py-2 mt-5 outline-none border-2 border-orange-400 rounded-md"
      />

      <button
        className="text-[22px] font-semibold bg-orange-500 rounded-2xl text-white px-16 py-2 mt-6"
        disabled={isLoading}
      >
        Sign Up
      </button>
      {error && <div>{error}</div>}
    </form>
  );
};
