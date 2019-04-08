const express = require("express");
const router = express.Router();
const animals = require("../data");
const animalData = animal.animals;

// /**
//  * Helper function from Rob's code: https://github.com/robherley/mongo-express-example/blob/master/routes/users.js
//  */
// async function doesAnimalExist(id) {
//   try {
//     await animals.get(id);
//     return true;
//   } catch (e) {
//     return false;
//   }
// }

/* GET /animals */
router.get("/", async (req, res) => {
  try {
    const animalList = await animalData.getAll();
    res.json(animalList);
  } catch (e) {
    res.status(404).json({ message: "not found!" });
  }
});

/* POST /animals */
router.post("/", async (req, res) => {
  const animalInfo = req.body;
});

module.exports = router;
