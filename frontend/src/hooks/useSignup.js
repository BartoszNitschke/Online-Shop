import { useState } from "react";
import { useUserContext } from "./useUserContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useUserContext();

  const signup = async (email, name, password) => {
    setIsLoading(true);
    setError(null);

    const res = await fetch("/api/user/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name, password }),
    });

    const json = await res.json();

    if (!res.ok) {
      setIsLoading(false);
      setError(json.error);
    }

    if (res.ok) {
      localStorage.setItem("user", JSON.stringify(json));
      const user = JSON.parse(localStorage.getItem("user"));

      const userDetailsRes = await fetch("/api/user/", {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      const detailsJSON = await userDetailsRes.json();

      if (!userDetailsRes.ok) {
        setIsLoading(false);
        setError(detailsJSON.error);
      }

      if (userDetailsRes.ok) {
        dispatch({ type: "LOGIN", payload: detailsJSON });
        setIsLoading(false);
      }
    }
  };

  return { signup, isLoading, error };
};
