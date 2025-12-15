const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const Quote = require("../models/Quote");
router.get("/", async (req, res) => {
  try {
    const savedQuotes = await Quote.find().sort({ savedAt: -1 });
    res.render("index", { savedQuotes });
  } catch (error) {
    res.status(500).send("Error loading quotes");
  }
});
router.get("/api/random-quote", async (req, res) => {
  try {
    const response = await fetch("https://dummyjson.com/quotes/random");
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch quote" });
  }
});
router.post("/save-quote", async (req, res) => {
  try {
    const { text, author, userNote } = req.body;

    const newQuote = new Quote({
      text,
      author,
      userNote,
    });

    await newQuote.save();
    res.redirect("/");
  } catch (error) {
    res.status(500).send("Error saving quote");
  }
});
router.post("/delete-quote/:id", async (req, res) => {
  try {
    await Quote.findByIdAndDelete(req.params.id);
    res.redirect("/");
  } catch (error) {
    res.status(500).send("Error deleting quote");
  }
});
module.exports = router;
