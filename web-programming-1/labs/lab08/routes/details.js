const express = require("express");
const router = express.Router();
const data = require("../data");
const peopleData = data.people;

router.get("/:id", async (req, res) => {
  const personDatail = await peopleData.getDetails();
  res.render("posts/details", { personName: personDatail });
});
