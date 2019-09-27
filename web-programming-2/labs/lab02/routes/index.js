const path = require("path");

const constructorMethod = app => {
  app.use("/", (req, res, next) => {
    /* Got help from Andrew for the part to deal with different path */
    if (req.originalUrl !== "/") {
      next();
    } else {
      res.sendFile(path.join(__dirname, "../views/index.html"));
    }
  });
  app.use("*", (req, res) => {
    res.status(404).json({ error: "Not found" });
  });
};

module.exports = constructorMethod;
