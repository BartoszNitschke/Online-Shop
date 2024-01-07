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
    <form className="mt-[200px]" onSubmit={handleSignUp}>
      <h2>Sign up</h2>

      <label>Name: </label>
      <input
        type="text"
        onChange={(e) => {
          setName(e.target.value);
        }}
        value={name}
      />

      <label>Email: </label>
      <input
        type="email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        value={email}
      />

      <label>Password: </label>
      <input
        type="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        value={password}
      />

      <button disabled={isLoading}>Sign Up</button>
      {error && <div>{error}</div>}
    </form>
  );
};
