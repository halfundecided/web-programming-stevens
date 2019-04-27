const express = require("express");
const router = express.Router();
const data = require("../data");
const userData = data.users;
const bcrypt = require("bcrypt");

router.get("/", async (req, res) => {
  if (req.cookies.AuthCookie) {
    res.redirect("/private");
  } else {
    res.render("login", {});
  }
});

router.post("/login", async (req, res) => {
  try {
    let username = req.body.username;
    let password = req.body.password;

    const users = userData.getUsers();

    let result = false;
    let num = 0;
    for (let i = 0; i < users.length; i++) {
      if (users[i].username === username) {
        result = true;
        num = i;
      }
    }
    try {
      result = await bcrypt.compare(password, user[i].hashedPassword);
    } catch (e) {
      console.log("are you here?");
      //   res.status(400).json({ error: e });
    }
    if (result === true) {
      res.cookie("AuthCookie", users[num]._id);
      res.redirect("/private");
    } else {
      res.status(401).render("login", {
        error: "ERROR: Incorrect Username and/or Password"
      });
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

module.exports = router;
