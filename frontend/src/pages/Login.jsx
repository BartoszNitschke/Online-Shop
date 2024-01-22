import React, { useState } from "react";
import { useLogin } from "../hooks/useLogin";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleLogin = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  return (
    <form
      className="flex flex-col justify-center items-center h-screen"
      onSubmit={handleLogin}
    >
      <h2 className="text-[48px] font-bold text-orange-500">Log In</h2>
      <input
        type="email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        value={email}
        placeholder="Email address"
        className="text-[22px] font-semibold px-7 py-2 mt-10 outline-none border-2 border-orange-400 rounded-md"
      />{" "}
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
        Log In
      </button>
      {error && (
        <div className="text-red-600 font-semibold text-[18px] mt-3">
          {error}
        </div>
      )}
    </form>
  );
};
