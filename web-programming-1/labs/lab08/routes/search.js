const express = require("express");
const router = express.Router();
const data = require("../data");
const peopleData = data.people;

router.get("/", async (req, res) => {
  const personName = req.query.personName;
  let errors = [];
  // console.log(req.query);
  // console.log(personName);
  try {
    const peopleList = await peopleData.searchResult(personName);
    // when no matchs are found

    if (peopleList.length === 0) {
      errors.push(`We're sorry, but no results were found for ${personName}`);
    }

    if (!personName) {
      errors.push("No input provided");
    }

    if (errors.length > 0) {
      res.render("search", { errors: errors, hasErrors: true });
      return;
    }

    res.render("search", {
      personName: personName,
      people: peopleList
    });
  } catch (e) {
    res.status(500).json({ error: e });
    console.log(e);
  }
});

module.exports = router;
