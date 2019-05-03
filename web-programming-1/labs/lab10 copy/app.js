const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const configRoutes = require("./routes");
const exphbs = require("express-handlebars");
const session = require("express-session");

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    name: "AuthCookie",
    secret: "mj is cool",
    resave: false,
    saveUninitialized: true
  })
);

app.use(function(req, res, next) {
  if (req.session.user) {
    console.log(
      `[${new Date().toUTCString()}] ${req.method} / ${
        req.originalUrl
      } (Authenticated User)`
    );
  } else {
    console.log(
      `[${new Date().toUTCString()}] ${req.method} / ${
        req.originalUrl
      } (Unauthenticated User)`
    );
  }

  next();
});

app.use("/admin", function(req, res, next) {
  console.log("Dont go to /admin!");
  res.status(403).render("error", {
    message: "ERROR: You cannot access /admin"
  });
});

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

configRoutes(app);

app.listen(3000, function() {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
