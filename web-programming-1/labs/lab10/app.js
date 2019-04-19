const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const configRoutes = require("./routes");
const exphbs = require("express-handlebars");
const session = require("express-session");

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(
  session({
    name: "AuthCookie",
    secret: "some secret string!",
    resave: false,
    saveUninitialized: true
  })
);

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

configRoutes(app);

app.listen(3000, function() {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
