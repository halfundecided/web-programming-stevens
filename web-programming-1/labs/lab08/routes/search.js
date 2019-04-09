const express = require("express");
const router = express.Router();
const data = require("../data");
const peopleData = data.people;

router.get("/", async (req, res) => {
  const peopleList = await peopleData.searchResult();
  res.render("posts/search", { personName: peopleList });
});
