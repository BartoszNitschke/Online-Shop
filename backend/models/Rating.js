const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ratingSchema = new Schema(
  {
    value: {
      type: Number,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    prodId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Rating", ratingSchema);
