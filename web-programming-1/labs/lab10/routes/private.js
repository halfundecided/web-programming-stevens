const express = require("express");
const router = express.Router();
const data = require("../data");
const userData = data.users;

router.use(function(req, res, next) {
  if (req.cookies.AuthCookie) {
    const sessionId = req.cookies.AuthCookie;
    var notValid = false;
    try {
      var currUser = userData.getUserById(sessionId);
    } catch (e) {
      res.status(403).json({ e: "Not Valid sessionId" });
      notValid = true;
    }

    if (notValid === false) {
      console.log(
        `[${new Data().toUTCString()}] ${req.method} / ${req.originalUrl}`
      );
      next();
    }
  } else {
    res.render("error", {
      message: "You are not logged in!",
      error: "Error: You are not logged in."
    });
    res.status(403).send("not currently logged in.");
  }
});

router.get("/", async (req, res) => {
  res.render("private/private", { user: currentUser });
});

module.exports = router;
