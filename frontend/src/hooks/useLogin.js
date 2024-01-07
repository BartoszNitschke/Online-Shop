import { useState } from "react";
import { useUserContext } from "./useUserContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useUserContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const res = await fetch("/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const json = await res.json();

    if (!res.ok) {
      setIsLoading(false);
      setError(json.error);
    }

    if (res.ok) {
      console.log("siema to ja", JSON.stringify(json));
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
        console.log("detale usera: ", detailsJSON);
        setIsLoading(false);
      }
    }
  };

  return { login, isLoading, error };
};
