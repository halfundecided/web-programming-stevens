/**
 * Mijeong Ban
 * I honor my pledge that I have abided by the Stevens Honor System.
 */
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const configRoutes = require("./routes");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const accessed = {};
app.use(function(req, res, next) {
  if (!accessed[req.path]) {
    accessed[req.path] = 0;
  }
  accessed[req.path]++;
  console.log("====================== REQUEST ======================");
  console.log("HTTP: " + req.method);
  console.log("PATH: " + req.originalUrl);
  console.log("BODY: " + JSON.stringify(req.body));
  console.log("TOTAL ACCESSES: " + accessed[req.path]);

  next();
});

configRoutes(app);
app.listen(3000, function() {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
