const express = require("express");
const {
  loginUser,
  signupUser,
  getUserDetails,
} = require("../controllers/userController");

const router = express.Router();

router.post("/login", loginUser);

router.post("/signup", signupUser);

router.get("/", getUserDetails);

module.exports = router;
