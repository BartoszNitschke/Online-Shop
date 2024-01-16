const express = require("express");
const {
  addOrder,
  getUserOrders,
  getOrders,
} = require("../controllers/orderController");

const router = express.Router();

router.get("/", getOrders);

router.get("/:id", getUserOrders);

router.post("/", addOrder);

module.exports = router;
