const express = require("express");
const router = express.Router();
const data = require("../data");
const peopleData = data.people;

router.get("/", async (req, res) => {
  const personName = req.query.personName;
  // console.log(req.query);
  // console.log(personName);
  try {
    const peopleList = await peopleData.searchResult(personName);
    res.render("search", {
      personName: personName,
      people: peopleList
    });
  } catch (e) {
    res.status(400).json({ error: "Not found" });
    console.log(e);
  }
});

module.exports = router;
