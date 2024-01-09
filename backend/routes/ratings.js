const express = require("express");
const {
  addRating,
  getRating,
  getRatings,
  deleteRating,
  updateRating,
} = require("../controllers/ratingController");

const router = express.Router();

router.get("/", getRatings);

router.get("/:id", getRating);

router.post("/", addRating);

router.delete("/:id", deleteRating);

router.patch("/:id", updateRating);

module.exports = router;
