const express = require("express");
const morgan = require("morgan");
const configRoutes = require("./routes");

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use(configRoutes);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
