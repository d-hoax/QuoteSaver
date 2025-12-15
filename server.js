require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const quoteRoutes = require("./routes/quotes");
const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI =
  process.env.MONGODB_CONNECTION_STRING ||
  "mongodb://localhost:27017/quotesaver";
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use("/", quoteRoutes);
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
