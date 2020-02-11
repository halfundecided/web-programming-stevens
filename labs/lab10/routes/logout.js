const express = require("express");
const router = express.Router();

router.use(function(req, res, next) {
  res.clearCookie("AuthCookie");
  next();
});

router.get("/", async (req, res) => {
  res.render("logout", {});
});

module.exports = router;
