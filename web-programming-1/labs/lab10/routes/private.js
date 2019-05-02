const express = require("express");
const app = express();
const router = express.Router();
const data = require("../data");
const userData = data.users;

// // middleware log
// var requestLog = function(req, res, next) {
//   console.log(
//     `[${new Date().toUTCString()}] ${req.method} / ${req.originalUrl}`
//   );
//   next();
// };
// router.use(requestLog);

var currUser = {};
router.use(function(req, res, next) {
  if (req.cookies.AuthCookie) {
    const sessionId = req.cookies.AuthCookie;
    var notValid = false;
    try {
      currUser = userData.getUserById(sessionId);
    } catch (e) {
      res.status(403).render("error", {
        message: "ERROR: Incorrect Username and/or Password"
      });
      notValid = true;
    }

    if (notValid === false) {
      next();
    }
  } else {
    res.render("error", {
      message: "ERROR: You are not logged in!"
    });
    res.status(403).send("not currently logged in.");
  }
});

router.get("/", async (req, res) => {
  res.render("private/private", { user: currUser });
});

module.exports = router;
