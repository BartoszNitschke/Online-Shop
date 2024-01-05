import React from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useUserContext } from "../hooks/useUserContext";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useUserContext();

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <Link to="/">Main Page</Link>
      <div>
        {user && (
          <div>
            <p>Hello {user.name}!</p>
            <button onClick={handleLogout}>Log out</button>
          </div>
        )}
        {!user && (
          <div>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign up</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
