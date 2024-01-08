const Review = require("../models/Review");
const mongoose = require("mongoose");

const getReviews = async (req, res) => {
  const reviews = await Review.find({});

  res.status(200).json(reviews);
};

const getReview = async (req, res) => {
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

const addReview = async (req, res) => {
  const { review, author, prodId } = req.body;

  try {
    const rev = await Review.create({
      review,
      author,
      prodId,
    });
    res.status(200).json(rev);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteReview = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No product with this id" });
  }

  const product = await Product.findOneAndDelete({ _id: id });

  if (!product) {
    return res.status(404).json({ error: "No product with this id" });
  }

  res.status(200).json(product);
};

const updateReview = async (req, res) => {
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
  addReview,
  getReview,
  getReviews,
  deleteReview,
  updateReview,
};
