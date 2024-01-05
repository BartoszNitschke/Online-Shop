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

    const userDetailsRes = await fetch("/api/user/" + email);
    const detailsJSON = await userDetailsRes.json();

    if (!res.ok) {
      setIsLoading(false);
      setError(json.error);
    }

    if (!userDetailsRes) {
      setIsLoading(false);
      setError(detailsJSON.error);
    }

    if (res.ok && userDetailsRes.ok) {
      console.log(JSON.stringify(json));
      console.log("details: ", JSON.stringify(detailsJSON));
      localStorage.setItem("user", JSON.stringify(json));

      dispatch({ type: "LOGIN", payload: detailsJSON });

      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
