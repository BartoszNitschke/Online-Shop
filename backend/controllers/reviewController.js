const Review = require("../models/Review");
const mongoose = require("mongoose");
const Product = require("../models/Product");

const getReviews = async (req, res) => {
  const reviews = await Review.find({});

  res.status(200).json(reviews);
};

const addReview = async (req, res) => {
  const { review, author, prodId } = req.body;

  try {
    const productExists = await Product.exists({ _id: prodId });
    if (!productExists) {
      throw new Error("Product with this prodId not found");
    }

    if (!author.trim() || !review.trim()) {
      throw new Error("Author, review cannot be empty");
    }

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
    return res.status(404).json({ error: "No review with this id" });
  }

  const review = await Review.findOneAndDelete({ _id: id });

  if (!review) {
    return res.status(404).json({ error: "No review with this id" });
  }

  res.status(200).json(review);
};

module.exports = {
  addReview,
  getReviews,
  deleteReview,
};
