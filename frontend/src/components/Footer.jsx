import React from "react";
import { Link } from "react-router-dom";
import { FaMousePointer } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <div className="h-[230px] w-full bg-orange-500 flex justify-center">
        <div className="w-[80%] h-[230px] flex justify-evenly">
          <div className="flex flex-col text-center">
            <h1 className="text-[24px] font-semibold text-gray-900 py-5">
              Check more
            </h1>
            <Link to="/products">
              <p className="text-[18px] font-semibold text-gray-900 py-1">
                Our products
              </p>
            </Link>
            <Link to="/men">
              <p className="text-[18px] font-semibold text-gray-900 py-1">
                Men
              </p>
            </Link>

            <Link to="/women">
              <p className="text-[18px] font-semibold text-gray-900 py-1">
                Women
              </p>
            </Link>
          </div>
          <div className="flex flex-col text-center">
            <h1 className="text-[24px] font-semibold text-gray-900 py-5">
              Your Panel
            </h1>
            <Link to="/products">
              <p className="text-[18px] font-semibold text-gray-900 py-1">
                Account
              </p>
            </Link>
            <Link to="/men">
              <p className="text-[18px] font-semibold text-gray-900 py-1">
                Cart
              </p>
            </Link>

            <Link to="/women">
              <p className="text-[18px] font-semibold text-gray-900 py-1">
                Log Out
              </p>
            </Link>
          </div>
          <div className="flex flex-col text-center">
            <h1 className="text-[24px] font-semibold text-gray-900 py-5">
              Contact
            </h1>
            <p className="text-[18px] font-semibold text-gray-900 py-1">
              82-137 Gdańsk, Urzędnicza 17
            </p>
            <p className="text-[18px] font-semibold text-gray-900 py-1">
              +48 213 742 069
            </p>
            <p className="text-[18px] font-semibold text-gray-900 py-1">
              office@lvetements.com
            </p>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col items-center bg-orange-500 pb-5">
        <h1 className="text-[18px] text-gray-900 font-semibold flex">
          Project serves for individual purposes. All photos thanks to
          <a
            href="https://unsplash.com"
            target="_blank"
            className="px-1 flex items-center"
          >
            unsplash.com
            <FaMousePointer className="pl-1 text-gray-900" />
          </a>
        </h1>
        <h1 className="text-[18px] text-gray-900 font-semibold flex">
          Created by
          <a
            href="https://github.com/BartoszNitschke/"
            target="_blank"
            className="px-1 flex items-center "
          >
            Bartosz Nitschke
            <FaMousePointer className="pl-1 text-gray-900" />
          </a>
        </h1>
        <a href="https://github.com/BartoszNitschke/" target="_blank"></a>
      </div>
    </>
  );
};

export default Footer;
