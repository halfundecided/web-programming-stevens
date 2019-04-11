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

/* POST /animals */
router.post("/", async (req, res) => {
  const animalInfo = req.body;
  console.log(animalInfo);

  if (!animalInfo) {
    res
      .status(400)
      .json({ error: "You must provide data to create an animal" });
    return;
  }
  if (!animalInfo.newName) {
    res.status(400).json({ error: "You must provide a name" });
    return;
  }
  if (!animalInfo.newType) {
    res.status(400).json({ error: "You must provide an animalType" });
    return;
  }

  try {
    const newAnimal = await animalData.create(
      animalInfo.newName,
      animalInfo.newType
    );
    res.json(newAnimal);
  } catch (e) {
    res.sendStatus(500);
  }
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

/* PUT /animals/{id} */
router.put("/:id", async (req, res) => {
  const animalInfo = req.body;

  if (!animalInfo) {
    res
      .status(400)
      .json({ error: "You must provide data to update an animal" });
    return;
  }
  if (!animalInfo.name || !animalInfo.animalType) {
    res.status(400).json({ error: "You must provide name or animalType" });
    return;
  }

  try {
    await animalData.get(req.params.id);
  } catch (e) {
    res.status(404).json({ error: "Animal not found" });
    return;
  }

  try {
    const updatedAnimal = await animalData.update(req.params.id, animalInfo);
    res.json(updatedAnimal);
  } catch (e) {
    res.sendStatus(500);
  }
});

/* DELETE /animals/{id} */
// doesnt work
router.delete(":/id", async (req, res) => {
  try {
    await animalData.get(req.params.id);
  } catch (e) {
    res.status(404).json({ error: "Animal not found" });
    return;
  }

  try {
    const deletedAnimal = await animalData.remove(req.params.id);
    res.status(200).json(deletedAnimal);
  } catch (e) {
    res.sendStatus(500);
    return;
  }
});

module.exports = router;
