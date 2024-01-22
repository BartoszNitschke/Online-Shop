const express = require("express");
const {
  addRating,
  getRatings,
  deleteRating,
} = require("../controllers/ratingController");

const router = express.Router();

router.get("/", getRatings);

router.post("/", addRating);

router.delete("/:id", deleteRating);

module.exports = router;
