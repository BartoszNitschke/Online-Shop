const Product = require("../models/Product");
const mongoose = require("mongoose");

const getProducts = async (req, res) => {
  const products = await Product.find({});

  if (!products) {
    return res.status(404).json({ error: "No products could be found" });
  }

  res.status(200).json(products);
};

const getProductsByRating = async (req, res) => {
  const products = await Product.aggregate([
    {
      $sort: { rating: -1 },
    },
    {
      $limit: 5,
    },
  ]);

  if (!products) {
    return res.status(404).json({ error: "No products could be found" });
  }

  res.status(200).json(products);
};

const getMenProducts = async (req, res) => {
  const products = await Product.find({ men: true });

  if (!products) {
    return res.status(404).json({ error: "No products could be found" });
  }

  res.status(200).json(products);
};

const getWomenProducts = async (req, res) => {
  const products = await Product.find({ women: true });

  if (!products) {
    return res.status(404).json({ error: "No products could be found" });
  }

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
    if (!name.trim() || !url.trim() || !description.trim() || !bio.trim()) {
      throw new Error("Name, url, description, and bio cannot be empty");
    }

    if (
      priceNoDelivery < 0 ||
      priceDelivery < 0 ||
      isNaN(priceNoDelivery) ||
      isNaN(priceDelivery)
    ) {
      throw new Error("Prices cannot be negative");
    }

    if (quantity < 0 || quantity % 1 !== 0 || isNaN(quantity)) {
      throw new Error("Invalid quantity");
    }

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

const addRating = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No product with this id" });
  }

  const newRating = req.body.rating !== undefined ? req.body.rating : 0;

  if (
    isNaN(newRating) ||
    newRating < 1 ||
    newRating > 5 ||
    newRating % 1 !== 0
  ) {
    return res
      .status(400)
      .json({ error: "Invalid rating. Must be a number between 1 and 5." });
  }

  const existingProduct = await Product.findById(id);

  const existingRatingSum = existingProduct
    ? existingProduct.ratingSum || 0
    : 0;
  const existingRatingCount = existingProduct
    ? existingProduct.ratingCount || 0
    : 0;

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
    { new: true, runValidators: true }
  );

  if (!product) {
    return res.status(404).json({ error: "No product with this id" });
  }

  res.status(200).json(product);
};

const deleteRating = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No product with this id" });
  }

  const newRating = req.body.rating !== undefined ? req.body.rating : 0;

  if (
    isNaN(newRating) ||
    newRating < 1 ||
    newRating > 5 ||
    newRating % 1 !== 0
  ) {
    return res
      .status(400)
      .json({ error: "Invalid rating. Must be a number between 1 and 5." });
  }

  const existingProduct = await Product.findById(id);

  const existingRatingSum = existingProduct
    ? existingProduct.ratingSum || 0
    : 0;
  const existingRatingCount = existingProduct
    ? existingProduct.ratingCount || 0
    : 0;

  const newRatingSum = existingRatingSum - newRating;
  const newRatingCount = existingRatingCount - 1;
  let newAverageRating = 0;
  if (newRatingSum !== 0) {
    newAverageRating = newRatingSum / newRatingCount;
  }

  const product = await Product.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
      ratingSum: newRatingSum,
      ratingCount: newRatingCount,
      rating: newAverageRating,
    },
    { new: true, runValidators: true }
  );

  if (!product) {
    return res.status(404).json({ error: "No product with this id" });
  }

  res.status(200).json(product);
};

const updateProduct = async (req, res) => {
  try {
    const { products } = req.body;

    const updatePromises = products.map(async ({ _id, quantity }) => {
      if (!mongoose.Types.ObjectId.isValid(_id)) {
        throw new Error("Invalid product id in the request");
      }

      const product = await Product.findById(_id);
      if (!product) {
        throw new Error("Product not found");
      }

      if (!Number.isInteger(quantity) || quantity <= 0) {
        throw new Error(
          "Invalid quantity. Quantity must be a positive integer"
        );
      }

      const updatedQuantity = product.quantity - quantity;

      if (updatedQuantity < 0) {
        throw new Error("Insufficient quantity in stock");
      }

      return Product.updateOne({ _id }, { $inc: { quantity: -quantity } });
    });

    const results = await Promise.allSettled(updatePromises);

    const errors = results
      .filter((result) => result.status === "rejected")
      .map((result) => result.reason.message);

    if (errors.length > 0) {
      throw new Error(errors.join(". "));
    }

    res.status(200).json({ message: "Products updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  addProduct,
  getProducts,
  getProductsByRating,
  getMenProducts,
  getWomenProducts,
  getProduct,
  deleteProduct,
  addRating,
  deleteRating,
  updateProduct,
};
