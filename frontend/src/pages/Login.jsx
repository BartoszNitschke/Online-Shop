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
    <form onSubmit={handleLogin}>
      <h2>Login</h2>

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

      <button disabled={isLoading}>Login</button>
      {error && <div>{error}</div>}
    </form>
  );
};
