const express = require("express");
const router = express.Router();

function LoggedIn(req, res, next) {
  if (!req.session.user) {
    return res.render("error", {
      message: "ERROR: You are not logged in!"
    });
  } else {
    next();
  }
}

router.get("/", LoggedIn, async (req, res) => {
  res.render("private/private", { user: req.session.user });
});

module.exports = router;
