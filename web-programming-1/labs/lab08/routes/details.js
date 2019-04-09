const express = require("express");
const router = express.Router();
const data = require("../data");
const peopleData = data.people;

router.get("/:id", async (req, res) => {
  const person = await peopleData.getPersonById(req.params.id);
  res.render("details", { person: person });
});

module.exports = router;
