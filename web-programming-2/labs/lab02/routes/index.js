const path = require("path");

const constructorMethod = app => {
  app.use("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/index.html"));
  });
  app.use("*", (req, res) => {
    res.status(404).json({ error: "Not found" });
  });
};

module.exports = constructorMethod;
