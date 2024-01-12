require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const productRoutes = require("./routes/products");
const userRoutes = require("./routes/user");
const reviewsRoutes = require("./routes/reviews");
const ratingRoutes = require("./routes/ratings");
const orderRoutes = require("./routes/order");

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/products", productRoutes);
app.use("/api/user", userRoutes);
app.use("/api/reviews", reviewsRoutes);
app.use("/api/rating", ratingRoutes);
app.use("/api/orders", orderRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("listening on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
