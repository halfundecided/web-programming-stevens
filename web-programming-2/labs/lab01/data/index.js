const tasksRoutes = require("./tasks");
const commentsRoutes = require("./comments");

const constructorMethod = app => {
  app.use("/tasks", tasksRoutes);
  app.use("/comments", commentsRoutes);

  app.use("*", (req, res) => {
    res.status(404).json({ error: "Not found" });
  });
};

module.exports = constructorMethod;
