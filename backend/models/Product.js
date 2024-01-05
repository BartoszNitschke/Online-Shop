const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    priceNoDelivery: {
      type: Number,
      required: true,
    },
    priceDelivery: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);