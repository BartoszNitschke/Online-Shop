const Rating = require("../models/Rating");
const mongoose = require("mongoose");
const User = require("../models/User");
const Product = require("../models/Product");

const getRatings = async (req, res) => {
  const ratings = await Rating.find({});

  res.status(200).json(ratings);
};

const addRating = async (req, res) => {
  const { value, author, userId, prodId } = req.body;

  try {
    if (!Number.isInteger(value) || value < 1 || value > 5) {
      throw new Error(
        "Invalid rating value. It must be an integer between 1 and 5."
      );
    }

    if (!author.trim()) {
      throw new Error("Author cannot be empty");
    }

    const userExists = await User.exists({ _id: userId });
    if (!userExists) {
      throw new Error("User with this userId not found");
    }

    const productExists = await Product.exists({ _id: prodId });
    if (!productExists) {
      throw new Error("Product with this prodId not found");
    }

    const rating = await Rating.create({
      value,
      author,
      userId,
      prodId,
    });

    res.status(200).json(rating);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteRating = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No rating with this id" });
  }

  const rating = await Rating.findOneAndDelete({ _id: id });

  if (!rating) {
    return res.status(404).json({ error: "No rating with this id" });
  }

  res.status(200).json(rating);
};

module.exports = {
  addRating,
  getRatings,
  deleteRating,
};
