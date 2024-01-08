const express = require("express");
const {
  addReview,
  getReview,
  getReviews,
  deleteReview,
  updateReview,
} = require("../controllers/reviewController");

const router = express.Router();

router.get("/", getReviews);

router.get("/:id", getReview);

router.post("/", addReview);

router.delete("/:id", deleteReview);

router.patch("/:id", updateReview);

module.exports = router;
