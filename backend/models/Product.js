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
    men: {
      type: Boolean,
      required: true,
    },
    women: {
      type: Boolean,
      required: true,
    },
    tshirt: {
      type: Boolean,
      required: true,
    },
    pants: {
      type: Boolean,
      required: true,
    },
    shoes: {
      type: Boolean,
      required: true,
    },
    socks: {
      type: Boolean,
      required: true,
    },
    rating: {
      type: Number,
      required: false,
    },
    ratingSum: {
      type: Number,
      required: false,
    },
    ratingCount: {
      type: Number,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
