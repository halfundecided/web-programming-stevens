const express = require("express");
const router = express.Router();
const data = require("../data");
const userData = data.users;
const bcrypt = require("bcrypt");

router.get("/", async (req, res) => {
  /* If the user is authenticated, it will redirect to /private */
  if (req.session.user) {
    res.redirect("/private");
  } else {
    /* If the user is not authenticated... */
    res.render("login", {});
  }
});

/* goes here */
router.post("/login", async (req, res) => {
  try {
    let username = req.body.username;
    let password = req.body.password;

    const users = userData.getUsers();

    let result = false;
    let num = 0;
    for (let i = 0; i < users.length; i++) {
      if (users[i].username === username) {
        num = i;
      }
    }
    try {
      result = await bcrypt.compare(password, users[num].hashedPassword);
    } catch (e) {
      res.status(400).json({ error: e });
    }
    if (result === true) {
      req.session.user = users[num];
      authenticated = true;
      res.redirect("/private");
    } else {
      // password wrong
      authenticated = false;
      res.status(401).render("error", {
        message: "ERROR: Incorrect Username and/or Password"
      });
    }
  } catch (e) {
    res.status(500).json("wrong");
  }
});

module.exports = router;
