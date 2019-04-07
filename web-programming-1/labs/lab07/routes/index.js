// const router = require("express").Router();

// const animalRoutes = require("./animals");
// const postRoutes = require("./posts");

// router.use("/animals", animalRoutes);
// router.use("/posts", postRoutes);

// router.use("*", (req, res) => {
//   res.status(404).json({
//     error: "Invalid Route",
//     route: req.originalUrl,
//     method: req.method
//   });
// });

// module.exports = router;

// const router = require("express").Router();

const animalRouter = require("./animals");
const postRouter = require("./posts");

// const constructorMethod = app => {
//   app = require("express").Router()
//   app.use("/animals", animalRoutes);
//   app.use("/posts", postRoutes);

//   app.use("*", (req, res) => {
//     res.status(404).json({ error: "Not found" });
//   });
// };

// module.exports = constructorMethod;

// router.use("/animals", animalRouter);
// router.use("/posts", postRouter);

// router.use("*", (req, res) => {
//   res.status(404).json({ error: "Not found" });
// });

// module.exports = router;

module.exports = app => {
  app.use("/animals", animalRouter);
  app.use("/posts", postRouter);

  app.use("*", (req, res) => {
    res.status(404).json({ error: "Not found" });
  });
};
