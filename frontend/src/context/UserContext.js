import { createContext, useReducer, useEffect, useState } from "react";

export const UserContext = createContext();

export const userReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, {
    user: null,
  });

  const [userDetails, setUserDetails] = useState();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    const getDetails = async (email) => {
      const userDetailsRes = await fetch("/api/user/" + email);
      const detailsJSON = await userDetailsRes.json();

      if (!userDetailsRes.ok) {
        throw Error(detailsJSON.error);
      }

      if (userDetailsRes.ok) {
        setUserDetails(detailsJSON);
        dispatch({ type: "LOGIN", payload: detailsJSON });
      }
    };

    if (user) {
      console.log("email usera: ", user.email);
      getDetails(user.email);
      console.log(userDetails);
    }
  }, []);

  console.log("UserContext state: ", state);

  return (
    <UserContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
