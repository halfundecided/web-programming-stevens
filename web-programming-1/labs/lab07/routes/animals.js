const express = require("express");
const router = express.Router();
const data = require("../data");
const animalData = data.animals;

/* GET /animals */
router.get("/", async (req, res) => {
  try {
    const animalList = await animalData.getAll();
    res.json(animalList);
  } catch (e) {
    res.status(404).json({ message: "not found!" });
  }
});

module.exports = router;
