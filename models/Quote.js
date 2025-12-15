const mongoose = require("mongoose");
const quoteSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  userNote: {
    type: String,
    default: "",
  },
  savedAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Quote", quoteSchema);
