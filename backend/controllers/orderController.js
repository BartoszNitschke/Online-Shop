const Order = require("../models/Order");
const mongoose = require("mongoose");
const Product = require("../models/Product");
const User = require("../models/User");

const getOrders = async (req, res) => {
  const orders = await Order.find({}).sort({ createdAt: -1 });

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

  if (isNaN(totalPrice) || totalPrice < 0) {
    return res.status(400).json({ error: "totalPrice must be a number" });
  }

  try {
    if (userId) {
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ error: "Invalid user id format" });
      }

      const user = await User.findById(userId);

      if (!user) {
        return res.status(400).json({ error: "User with this id not found" });
      }
    }
  } catch (err) {
    console.error("Error in addOrder:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }

  try {
    const processedProducts = await Promise.all(
      products.map(async (orderProduct) => {
        const productFromDB = await Product.findById(orderProduct._id);

        if (!productFromDB) {
          throw new Error(`Product with _id ${orderProduct._id} not found`);
        }

        const { _id, name, priceNoDelivery } = productFromDB;
        const quantity = orderProduct.quantity;

        if (
          isNaN(quantity) ||
          !Number.isInteger(quantity) ||
          quantity % 1 !== 0 ||
          quantity <= 0
        ) {
          throw new Error(`Invalid quantity for product ${name}`);
        }
        return {
          _id,
          name,
          priceNoDelivery,
          quantity,
        };
      })
    );
    const order = await Order.create({
      userId,
      products: processedProducts,
      totalPrice,
    });

    res.status(200).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  addOrder,
  getUserOrders,
  getOrders,
};
