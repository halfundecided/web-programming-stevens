const searchRoutes = require("./search");
const detailRoutes = require("./details");
const path = require("path");

const constructorMethod = app => {
  app.use("/search", searchRoutes);
  app.use("/details", detailRoutes);
  app.get("/", (req, res) => {
    res.sendFile(path.resolve("static/main.html"));
  });

  app.use("*", (req, res) => {
    res.redirect("/search");
  });
};

module.exports = constructorMethod;
