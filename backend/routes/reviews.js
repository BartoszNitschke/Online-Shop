const express = require("express");
const {
  addReview,
  getReviews,
  deleteReview,
} = require("../controllers/reviewController");

const router = express.Router();

router.get("/", getReviews);

router.post("/", addReview);

router.delete("/:id", deleteReview);

module.exports = router;
