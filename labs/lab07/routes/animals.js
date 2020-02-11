const express = require("express");
const router = express.Router();
const data = require("../data");
const animalData = data.animals;
const postData = data.posts;

/* GET /animals */
router.get("/", async (req, res) => {
  try {
    const animalList = await animalData.getAll();
    const giveMeAll = [];
    for (let i = 0; i < animalList.length; i++) {
      giveMeAll.push(await animalData.get(String(animalList[i]._id)));
    }
    res.json(giveMeAll);
  } catch (e) {
    res.status(404).json({ message: "not found!" });
  }
});

/* POST /animals */
router.post("/", async (req, res) => {
  const animalInfo = req.body;

  if (!animalInfo) {
    res
      .status(400)
      .json({ error: "You must provide data to create an animal" });
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
    res.status(200).json(newAnimal);
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
  if (!animalInfo.newName || !animalInfo.newType) {
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
router.delete("/:id", async (req, res) => {
  try {
    const thisAnimal = await animalData.get(req.params.id);
    for (let i = 0; i < thisAnimal.posts.length; i++) {
      await postData.deletePost(String(thisAnimal.posts[i]._id));
    }
  } catch (e) {
    res.status(404).json({ error: "Animal not found" });
    return;
  }

  try {
    const printDeletedAnimal = {};
    const deletedAnimalData = await animalData.get(req.params.id);
    await animalData.remove(req.params.id);
    printDeletedAnimal.deleted = true;
    printDeletedAnimal.data = deletedAnimalData;
    res.status(200).json(printDeletedAnimal);
  } catch (e) {
    res.sendStatus(500);
    return;
  }
});

module.exports = router;
