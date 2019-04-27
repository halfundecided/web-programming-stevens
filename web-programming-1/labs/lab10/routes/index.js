const loginRoutes = require("./login");
const logoutRoutes = require("./logout");
const privateRoutes = require("./private");

const constructorMethod = app => {
  app.use("/", loginRoutes);
  app.use("/private", privateRoutes);
  app.use("/logout", logoutRoutes);
};

module.exports = constructorMethod;
