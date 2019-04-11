const express = require("express");
const router = express.Router();
const data = require("../data");
const animalData = data.animals;

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

  if (!animalInfo) {
    res.status(400).json({ error: "You must provide data to create a user" });
    return;
  }
  if (!animalInfo.name) {
    res.status(400).json({ error: "You must provide a name" });
    return;
  }
  if (!animalInfo.animalType) {
    res.status(400).json({ error: "You must provide an animalType" });
    return;
  }

  try {
    const newAnimal = await animalData.create(
      animalInfo.name,
      animalInfo.animalType
    );
    res.json(newAnimal);
  } catch (e) {
    res.sendStatus(500);
  }
  // ?? how are we actually sending data?
});

/* GET /animals/{id} */
router.get("/:id", async (req, res) => {
  try {
    const animal = await animalData.get(req.params.id);
    res.status(200).json(animal);
  } catch (e) {
    res.status(404).json({ error: "Animal not found!" });
  }
});

module.exports = router;
