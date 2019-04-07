const express = require("express");
const router = express.Router();
const data = require("../data");
const animalData = data.animals;

/* GET /animals */
router.get("/", async (req, res) => {
  try {
    const animal = await animalData.getAll();
    res.json(animal);
  } catch (e) {
    res.status(404).json({ message: "not found!" });
  }
});

module.exports = router;
