const Rating = require("../models/Rating");
const mongoose = require("mongoose");

const getRatings = async (req, res) => {
  const ratings = await Rating.find({});

  res.status(200).json(ratings);
};

const getRating = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No product with this id" });
  }

  const product = await Product.findById(id);

  if (!product) {
    return res.status(404).json({ error: "No product with this id" });
  }

  res.status(200).json(product);
};

const addRating = async (req, res) => {
  const { value, author, userId, prodId } = req.body;

  try {
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
    return res.status(404).json({ error: "No review with this id" });
  }

  const rating = await Rating.findOneAndDelete({ _id: id });

  if (!rating) {
    return res.status(404).json({ error: "No review with this id" });
  }

  res.status(200).json(rating);
};

const updateRating = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No product with this id" });
  }

  const product = await Product.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!product) {
    return res.status(404).json({ error: "No product with this id" });
  }

  res.status(200).json(product);
};

module.exports = {
  addRating,
  getRating,
  getRatings,
  deleteRating,
  updateRating,
};
