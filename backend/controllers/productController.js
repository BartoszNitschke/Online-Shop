const Product = require("../models/Product");
const mongoose = require("mongoose");

const getProducts = async (req, res) => {
  const products = await Product.find({});

  res.status(200).json(products);
};

const getProduct = async (req, res) => {
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

const addProduct = async (req, res) => {
  const {
    name,
    url,
    priceNoDelivery,
    priceDelivery,
    description,
    bio,
    quantity,
    men,
    women,
    tshirt,
    pants,
    shoes,
    socks,
  } = req.body;

  try {
    const product = await Product.create({
      name,
      url,
      priceNoDelivery,
      priceDelivery,
      description,
      bio,
      quantity,
      men,
      women,
      tshirt,
      pants,
      shoes,
      socks,
    });
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteProduct = async (req, res) => {
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

const updateProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No product with this id" });
  }

  const existingProduct = await Product.findById(id);

  // Jeśli nie ma jeszcze pola rating, ustaw początkowe wartości
  const existingRatingSum = existingProduct
    ? existingProduct.ratingSum || 0
    : 0;
  const existingRatingCount = existingProduct
    ? existingProduct.ratingCount || 0
    : 0;

  // Jeśli jest pole rating w req.body, dodaj nową ocenę do sumy i zwiększ licznik
  const newRating = req.body.rating !== undefined ? req.body.rating : 0;
  const newRatingSum = existingRatingSum + newRating;
  const newRatingCount = existingRatingCount + 1;
  const newAverageRating = newRatingSum / newRatingCount;

  const product = await Product.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
      ratingSum: newRatingSum,
      ratingCount: newRatingCount,
      rating: newAverageRating,
    },
    { new: true, upsert: true, runValidators: true }
  );

  if (!product) {
    return res.status(404).json({ error: "No product with this id" });
  }

  res.status(200).json(product);
};

module.exports = {
  addProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
};
