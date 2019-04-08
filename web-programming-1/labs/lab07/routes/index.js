const router = require("express").Router();

const animalRoutes = require("./animals");
// const postRoutes = require("./posts");

router.use("/animals", animalRoutes);

router.use("*", (req, res) => {
  res.status(404).json({ error: "Invalid Route" });
});

module.exports = router;
