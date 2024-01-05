const express = require("express");
const {
  addProduct,
  getProduct,
  getProducts,
  deleteProduct,
  updateProduct,
} = require("../controllers/productController");

const router = express.Router();

router.get("/", getProducts);

router.get("/:id", getProduct);

router.post("/", addProduct);

router.delete("/:id", deleteProduct);

router.patch("/:id", updateProduct);

module.exports = router;
