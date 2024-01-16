const Order = require("../models/Order");
const mongoose = require("mongoose");

const getOrders = async (req, res) => {
  const orders = await Order.find({});

  res.status(200).json(orders);
};

const getUserOrders = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No product with this id" });
  }

  const order = await Order.findById(id);

  if (!order) {
    return res.status(404).json({ error: "No product with this id" });
  }

  res.status(200).json(order);
};

const addOrder = async (req, res) => {
  const { userId, products, totalPrice } = req.body;

  try {
    const rating = await Order.create({
      userId,
      products,
      totalPrice,
    });
    res.status(200).json(rating);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  addOrder,
  getUserOrders,
  getOrders,
};
