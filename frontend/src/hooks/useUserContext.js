import { UserContext } from "../context/UserContext";
import { useContext } from "react";

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw Error("hook must be used inside the context");
  }

  return context;
};
