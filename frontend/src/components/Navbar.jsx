import React from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useUserContext } from "../hooks/useUserContext";
import {
  CiUser,
  CiSearch,
  CiShoppingCart,
  CiDesktop,
  CiLogout,
} from "react-icons/ci";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useUserContext();

  console.log(user);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="bg-orange-500 text-gray-200 text-center py-2 text-[16px] font-semibold  z-10 fixed w-full ">
        <h1>Free shipping on order over 40$. Easy returns!</h1>
      </div>
      <div className=" w-[100%] mt-10 fixed z-10  h-[70px] bg-white flex justify-center">
        <div className="w-[95%] flex justify-between items-center">
          <div className="text-[18px] py-2">
            <Link className="px-2 font-semibold" to="/products">
              Our products
            </Link>
            <Link className="px-2 font-semibold" to="/men">
              Men
            </Link>
            <Link className="px-2 font-semibold" to="/women">
              Women
            </Link>
          </div>

          <Link className="text-orange-500 text-[32px] font-bold" to="/">
            Les vêtements
          </Link>

          <div className="flex items-center">
            {!user && (
              <>
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign up</Link>
              </>
            )}
            {user && (
              <>
                <button className="text-[28px] px-2">
                  <CiSearch />
                </button>
                <button className="text-[28px] px-2">
                  <CiUser />
                </button>
                <button className="text-[30px] px-2">
                  <CiShoppingCart />
                </button>
                <button onClick={handleLogout} className="text-[28px] px-2">
                  <CiLogout />
                </button>
                <h1>{user.email}</h1>
              </>
            )}

            {user && user.admin && (
              <Link className="text-[28px] px-2 " to="/adminpanel">
                <CiDesktop />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
