import React, { useState, useEffect } from "react";
import { useUserContext } from "../hooks/useUserContext";
import { useLogout } from "../hooks/useLogout";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";

const Account = () => {
  const [orders, setOrders] = useState();
  const [changePassword, setChangePassword] = useState(false);
  const [firstPassword, setFirstPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  const [deleteAccount, setDeleteAccount] = useState(false);
  const [accountPassword, setAccountPassword] = useState("");
  const [option, setOption] = useState("password");
  const [error, setError] = useState(null);
  const { logout } = useLogout();

  const { user } = useUserContext();
  useEffect(() => {
    const fetchOrders = async () => {
      const res = await fetch("/api/orders");
      const json = await res.json();

      if (res.ok) {
        setOrders(json);
      }
    };

    fetchOrders();
  }, []);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (firstPassword === secondPassword) {
      //patch ze zmiana hasla
      const newPassword = firstPassword;
      console.log(newPassword); //newPassword nie jest undefined
      const user = JSON.parse(localStorage.getItem("user"));

      const res = await fetch("/api/user/changePassword", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newPassword }),
      });

      const json = await res.json();

      if (!res.ok) {
        throw Error("Error while changing your password");
      }
      if (res.ok) {
        console.log("Your password has been changed!");
        setError(null);
        setFirstPassword("");
        setSecondPassword("");
        setChangePassword(false);
        if (json) {
          console.log(json);
        }
      }
    } else {
      setError("Passwords must be the same!");
    }
  };

  const handleDeleteAccount = async (e) => {
    e.preventDefault();

    const password = accountPassword;
    const userLS = JSON.parse(localStorage.getItem("user"));

    const res = await fetch("/api/user/deleteAccount/" + user._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${userLS.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });

    const json = await res.json();

    if (!res.ok) {
      throw Error("Error deleting your account");
    }
    if (res.ok) {
      setError(null);
      setAccountPassword("");
      setDeleteAccount(false);
      logout();
    }
  };

  const handleOption = () => {
    if (option === "password") {
      setOption("account");
    } else {
      setOption("password");
    }
  };

  return (
    <div className=" min-h-screen flex-col items-center flex mt-[120px] animate fadeDown">
      <h1 className="text-[48px] text-orange-500 font-bold pb-10">Account</h1>
      <div className="flex  w-[90%] ">
        <div className="flex  w-[50%]">
          <div className="flex flex-col">
            <button
              onClick={() => {
                setOption("password");
                setError(null);
              }}
              className={
                option === "password"
                  ? "bg-orange-500 px-6 py-2 m-1 font-bold text-[18px] rounded-xl"
                  : "bg-gray-400 px-6 py-2 m-1 font-bold text-[18px] rounded-xl"
              }
            >
              Change Password
            </button>
            <button
              onClick={() => {
                setOption("account");
                setError(null);
              }}
              className={
                option === "account"
                  ? "bg-orange-500 px-6 py-2 m-1 font-bold text-[18px] rounded-xl"
                  : "bg-gray-400 px-6 py-2 m-1 font-bold text-[18px] rounded-xl"
              }
            >
              Delete account
            </button>
          </div>
          {option === "password" && (
            <div>
              <form
                onSubmit={handlePasswordChange}
                className="flex flex-col items-center px-8"
              >
                <input
                  type="password"
                  value={firstPassword}
                  onChange={(e) => setFirstPassword(e.target.value)}
                  placeholder="New Password"
                  className="px-4 py-2 my-1 mr-1 text-[16px] outline-none border-2 border-gray-700 rounded-xl"
                />

                <input
                  type="password"
                  value={secondPassword}
                  onChange={(e) => setSecondPassword(e.target.value)}
                  placeholder="Confirm password"
                  className="px-4 py-2 my-1 mr-1 text-[16px] outline-none border-2 border-gray-700 rounded-xl"
                />
                <button className="bg-orange-500 px-10 py-2 m-1 mt-4 font-bold text-[20px] rounded-xl ">
                  Change
                </button>
              </form>
              {error && (
                <p className="text-center py-2 text-red-600 font-semibold">
                  {error}
                </p>
              )}
            </div>
          )}

          {option === "account" && (
            <div className="px-8">
              <h1 className="text-orange-500 font-bold text-[18px]">
                Type your password to confirm
              </h1>
              <form
                onSubmit={handleDeleteAccount}
                className="flex flex-col items-center"
              >
                <input
                  type="password"
                  value={accountPassword}
                  onChange={(e) => setAccountPassword(e.target.value)}
                  className="px-4 py-2 my-2 mr-1 text-[16px] outline-none border-2 border-gray-700 rounded-xl"
                />
                <button className="bg-orange-500 px-10 py-2 m-1 mt-2 font-bold text-[20px] rounded-xl ">
                  Delete
                </button>
              </form>
              {error && (
                <p className="text-center py-2 text-red-600 font-semibold">
                  {error}
                </p>
              )}
            </div>
          )}
        </div>

        {user && orders && (
          <div className="w-[50%] flex items-center flex-col">
            <h1 className="text-[30px] text-orange-500 font-semibold">
              Your last orders
            </h1>
            {/* roboczo slice 05 */}
            {orders.slice(0, 5).map((order) => {
              if (order.userId === user._id) {
                return (
                  <div className="flex flex-col items-center py-4 border-b-2 border-orange-600">
                    {order.products.map((product) => {
                      return (
                        <div className="flex items-center">
                          <p className="text-[18px] font-semibold px-3">
                            {product.name}
                          </p>
                          <p className="font-semibold text-orange-500 px-1">
                            {product.priceNoDelivery} PLN
                          </p>
                          <p className="font-semibold px-1">
                            X {product.quantity}
                          </p>
                        </div>
                      );
                    })}
                    <p className="text-[18px] font-semibold text-orange-500">
                      Total price: {order.totalPrice} PLN
                    </p>
                    <p className="text-[18px] font-semibold text-orange-500">
                      {formatDistanceToNow(new Date(order.createdAt), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                );
              }
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Account;
