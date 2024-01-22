import { createContext, useReducer, useEffect } from "react";

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

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    const fetchUserData = async () => {
      const res = await fetch("/api/user/", {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      const json = await res.json();

      if (res.ok) {
        dispatch({ type: "LOGIN", payload: json });
      }
    };

    if (user) {
      fetchUserData();
    }
  }, []);

  return (
    <UserContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
