const express = require("express");
const router = express.Router();
const data = require("../data");
const postData = data.posts;
const animalData = data.animals;
const likeData = data.likes;

router.post("/:id", async (req, res) => {
  const postId = req.query;

  try {
    await animalData.get(req.params.id);
  } catch (e) {
    res.status(404).json({ error: "Animal not found" });
    return;
  }
  try {
    await postData.getPostByObject(postId);
  } catch (e) {
    res.status(404).json({ error: "Post not found" });
    return;
  }

  try {
    await likeData.addLikes(req.params.id, postId);
    res.status(200).json({ message: "successfully added!" });
  } catch (e) {
    res.sendStatus(500);
  }
});

router.delete("/:id", async (req, res) => {
  const postId = req.query;

  try {
    await animalData.get(req.params.id);
  } catch (e) {
    res.status(404).json({ error: "Animal not found" });
    return;
  }
  try {
    await postData.getPostByObject(postId);
  } catch (e) {
    res.status(404).json({ error: "Post not found" });
    return;
  }

  try {
    await likeData.removeLikes(req.params.id, postId);
    res.status(200).json({ message: "successfully deleted!" });
  } catch (e) {
    res.sendStatus(500);
  }
});

module.exports = router;
