const router = require("express").Router();

const animalRoutes = require("./animals");
const postRoutes = require("./posts");
const likeRoutes = require("./likes");

router.use("/animals", animalRoutes);
router.use("/posts", postRoutes);
router.use("/likes", likeRoutes);

router.use("*", (req, res) => {
  res.status(404).json({ error: "Invalid Route" });
});

module.exports = router;
