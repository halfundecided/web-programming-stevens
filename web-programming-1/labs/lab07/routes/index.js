const animalRoutes = require("./animals");
const postRoutes = require("./posts");

const constructorMethod = app => {
  app.use("/animals", animalroutes);
  app.use("/posts", postRoutes);

  app.use("*", (req, res) => {
    res.status(404).json({ error: "Not found" });
  });
};

module.exports = constructorMethod;
