const constructorMethod = app => {
  app.use("/", (req, res) => {
    res.render("prime/index");
  });
  app.use("*", (req, res) => {
    res.redirect("/");
  });
};

module.exports = constructorMethod;
