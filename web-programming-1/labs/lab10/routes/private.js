const express = require("express");
const router = express.Router();
const data = require("../data");
const userData = data.users;

router.use(function(req, res, next) {
  if (req.cookies.AuthCookie) {
    const sessionId = req.cookies.AuthCookie;
    var notValid = false;
    try {
      let currUser = userData.getUserById(sessionId);
    } catch (e) {
      res.status(403).json({ e: "Not Valid sessionId" });
      notValid = true;
    }

    if (notValid === false) {
      next();
    }
  } else {
    res.status(403).render("login", {
      error: "ERROR: You are not logged in!"
    });
  }
});

router.get("/", async (req, res) => {
  res.render("private/private", { user: currentUser });
});

module.exports = router;
