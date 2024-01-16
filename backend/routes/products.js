const express = require("express");
const {
  addProduct,
  getProduct,
  getProducts,
  deleteProduct,
  addRating,
  deleteRating,
  getProductsByRating,
  getMenProducts,
  getWomenProducts,
  updateProduct,
} = require("../controllers/productController");

const router = express.Router();

router.get("/", getProducts);

router.get("/rating", getProductsByRating);

router.get("/men", getMenProducts);

router.get("/women", getWomenProducts);

router.get("/:id", getProduct);

router.post("/", addProduct);

router.delete("/:id", deleteProduct);

router.patch("/:id", addRating);

router.patch("/deleteRating/:id", deleteRating);

router.patch("/", updateProduct);

module.exports = router;
