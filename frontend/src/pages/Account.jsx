import React, { useState, useEffect } from "react";
import { useUserContext } from "../hooks/useUserContext";
import { useLogout } from "../hooks/useLogout";

const Account = () => {
  const [orders, setOrders] = useState();
  const [changePassword, setChangePassword] = useState(false);
  const [firstPassword, setFirstPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  const [deleteAccount, setDeleteAccount] = useState(false);
  const [accountPassword, setAccountPassword] = useState("");
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

  return (
    <div className="mt-[120px]">
      <h1>Account</h1>
      <button
        onClick={() => setChangePassword(!changePassword)}
        className="border-2 border-black px-4 py-2"
      >
        Change Password
      </button>
      <button
        onClick={() => setDeleteAccount(!deleteAccount)}
        className="border-2 border-black px-4 py-2"
      >
        Delete account
      </button>
      {changePassword && (
        <div>
          <form onSubmit={handlePasswordChange}>
            <label>
              Password:
              <input
                type="password"
                value={firstPassword}
                onChange={(e) => setFirstPassword(e.target.value)}
              />
            </label>
            <label>
              Confirm password:
              <input
                type="password"
                value={secondPassword}
                onChange={(e) => setSecondPassword(e.target.value)}
              />
            </label>
            <button className="border-2 border-black px-4 py-2">
              Change your password
            </button>
          </form>
          {error && <p>{error}</p>}
        </div>
      )}

      {deleteAccount && (
        <div>
          <h1>Type your password to confirm</h1>
          <form onSubmit={handleDeleteAccount}>
            <input
              type="password"
              value={accountPassword}
              onChange={(e) => setAccountPassword(e.target.value)}
            />
            <button className="border-2 border-black px-4 py-2">Delete</button>
          </form>
          {error && <p>{error}</p>}
        </div>
      )}

      {user && orders && (
        <div>
          {/* roboczo slice 05 */}
          {orders.slice(0, 5).map((order) => {
            if (order.userId === user._id) {
              return (
                <div>
                  <p>{order.totalPrice}</p>
                  {order.products.map((product) => {
                    return (
                      <div>
                        <p>{product.name}</p>
                        <p>{product.priceNoDelivery}</p>
                        <p>{product.quantity}</p>
                      </div>
                    );
                  })}
                </div>
              );
            }
          })}
        </div>
      )}
    </div>
  );
};

export default Account;
