const express = require("express");
const router = express.Router();
const data = require("../data");
const postData = data.posts;
const animalData = data.animals;

router.get("/", async (req, res) => {
  try {
    const postList = await postData.getAll();
    for (let i = 0; i < postList.length; i++) {
      const thisAuthor = postList[i];
      const thisAuthorName = await animalData.get(thisAuthor.author);
      const author = {
        _id: `${thisAuthor.author}`,
        name: `${thisAuthorName.name}`
      };
      postList[i].author = author;
    }
    res.json(postList);
  } catch (e) {
    res.status(404).json({ error: "not found!" });
  }
});

/* POST /posts */
router.post("/", async (req, res) => {
  const postInfo = req.body;

  if (!postInfo) {
    res.status(400).json({ error: "You must provide data to create a post" });
    return;
  }
  if (!postInfo.title) {
    res.status(400).json({ error: "You must provide a title" });
    return;
  }
  if (!postInfo.author) {
    res.status(400).json({ error: "You must provide author's id" });
    return;
  }
  if (!postInfo.content) {
    res.status(400).json({ error: "You must provide a content" });
  }

  try {
    const newPost = await postData.createPost(
      postInfo.author,
      postInfo.title,
      postInfo.content
    );
    res.json(newPost);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

/* GET /posts/{id} */
router.get("/:id", async (req, res) => {
  try {
    const post = await postData.readPost(req.params.id);
    const thisAuthor = await animalData.get(post.author);

    const author = {
      _id: `${thisAuthor._id}`,
      name: `${thisAuthor.name}`
    };
    post.author = author;
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
    await postData.readPost(req.params.id);
  } catch (e) {
    res.status(404).json({ error: "Post not found" });
    return;
  }

  try {
    const updatedPost = await postData.updatePost(
      req.params.id,
      postInfo.newTitle,
      postInfo.newContent
    );
    const thisAuthor = await animalData.get(updatedPost.author);
    const author = {
      _id: `${thisAuthor._id}`,
      name: `${thisAuthor.name}`
    };
    updatedPost.author = author;
    res.json(updatedPost);
  } catch (e) {
    res.sendStatus(500);
  }
});

/* DELETE /posts/{id} */
router.delete("/:id", async (req, res) => {
  try {
    await postData.readPost(req.params.id);
  } catch (e) {
    res.status(404).json({ error: "Post not found" });
    return;
  }

  try {
    const deletedPost = await postData.deletePost(req.params.id);
    res.status(200).json(deletedPost);
  } catch (e) {
    res.sendStatus(500);
    return;
  }
});

module.exports = router;
