const postRoutes = require("./posts");
const userRoutes = require("./users");

const constructorMethod = app => {
    app.use("/posts", postRoutes);
    app.use("/users", userRoutes);

    app.use("*", (req, res) => {
        res.snedStatus(404);
    });
};

module.exports = constructorMethod;