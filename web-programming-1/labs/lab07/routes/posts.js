const express = require("express");
const router = express.Router();
const data = require("../data");
const postData = data.posts;

/* GET /posts */
router.get("/", async (req, res) => {
  try {
    const postList = await postData.getAll();
    res.json(postList);
  } catch (e) {
    res.status(404).json({ error: "not found!" });
  }
});

/* POST /posts */
router.post("/", async (req, res) => {
  const post = req.body;
  try {
    const { title, author, content } = post;
    const newPost = await postData.createPost(title, author, content);

    res.json(newPost);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

/* GET /posts/{id} */
router.get("/:id", async (req, res) => {
  try {
    const post = await postData.readPost(req.params.id);
    res.json(post);
  } catch (e) {
    res.status(404).json({ error: "Post not found" });
  }
});

/* PUT /posts/{id} */
router.put("/:id", async (req, res) => {
  const postInfo = req.body;
  if (!postInfo) {
    res
      .status(400)
      .json({ error: "You must provide data to update this post" });
    return;
  }
  if (!postInfo.newTitle || !postInfo.newContent) {
    res.status(400).json({ error: "You must provide title or content" });
    return;
  }

  try {
    await postData.get(req.params.id);
  } catch (e) {
    res.status(404).json({ error: "Post not found" });
    return;
  }

  try {
    const updatedPost = await postData.updatePost(
      req.params.id,
      postInfo.title,
      postInfo.content
    );
    res.json(updatedPost);
  } catch (e) {
    res.sendStatus(500);
  }
});

/* DELETE /posts/{id} */
router.delete("/:id", async (req, res) => {
  try {
    await postData.get(req.params.id);
  } catch (e) {}
});

module.exports = router;
