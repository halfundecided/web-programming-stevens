const express = require("express");
const router = express.Router();
const data = require("../data");
const peopleData = data.people;

router.get("/", async (req, res) => {
  const { personName } = req.body;
  const peopleList = await peopleData.searchResult();
  res.render("search", { personName: personName, people: peopleList });
});

module.exports = router;
