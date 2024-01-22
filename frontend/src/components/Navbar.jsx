import React from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useUserContext } from "../hooks/useUserContext";
import { CiUser, CiShoppingCart, CiDesktop, CiLogout } from "react-icons/ci";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useUserContext();

  console.log(user);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="bg-orange-500 text-gray-200 text-center py-2 text-[16px] font-semibold  z-10 fixed w-full  after:content-[Easy]">
        <h1>Free shipping on order over 250 PLN. Easy returns!</h1>
      </div>
      <div className=" w-[100%] mt-10 fixed z-10  h-[70px] bg-white flex justify-center shadow-md shadow-gray-300">
        <div className="w-[95%] flex  items-center ">
          <div className="text-[18px] py-2 flex  w-[30%]">
            <Link
              className="px-2 font-semibold transition hover:translate-y-[-3px]"
              to="/products"
            >
              Our products
            </Link>
            <Link
              className="px-2 font-semibold transition hover:translate-y-[-3px]"
              to="/men"
            >
              Men
            </Link>
            <Link
              className="px-2 font-semibold transition hover:translate-y-[-3px]"
              to="/women"
            >
              Women
            </Link>
          </div>

          <Link
            className="text-orange-500 text-[32px] font-bold w-[40%] flex justify-center"
            to="/"
          >
            Les vêtements
          </Link>

          <div className="flex items-center w-[30%] justify-end">
            {!user && (
              <div className="text-[18px] py-2 flex">
                <Link className="px-2 font-semibold " to="/login">
                  <h1 className="transition hover:translate-y-[-3px]">Login</h1>
                </Link>
                <Link className="px-2 font-semibold " to="/signup">
                  <h1 className="transition hover:translate-y-[-3px]">
                    Sign up
                  </h1>
                </Link>
                <Link className="px-2 font-semibold " to="/cart">
                  <h1 className="transition hover:translate-y-[-3px]">Cart</h1>
                </Link>
              </div>
            )}
            {user && (
              <>
                <Link to="/account">
                  <button className="text-[28px] px-2 mt-1 transition hover:scale-110">
                    <CiUser />
                  </button>
                </Link>
                <Link to="/cart">
                  <button className="text-[30px] px-2 mt-1 transition hover:scale-110">
                    <CiShoppingCart />
                  </button>
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-[28px] px-2 transition hover:scale-110"
                >
                  <CiLogout />
                </button>
              </>
            )}

            {user && user.admin && (
              <Link
                className="text-[28px] px-2 transition hover:scale-110"
                to="/adminpanel"
              >
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
