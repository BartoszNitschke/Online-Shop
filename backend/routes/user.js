const express = require("express");
const {
  loginUser,
  signupUser,
  getUserDetails,
  changePassword,
  deleteAccount,
} = require("../controllers/userController");

const router = express.Router();

router.post("/login", loginUser);

router.post("/signup", signupUser);

router.get("/", getUserDetails);

router.patch("/changePassword", changePassword);

router.delete("/deleteAccount/:id", deleteAccount);

module.exports = router;
