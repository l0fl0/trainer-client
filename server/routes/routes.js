const router = require("express").Router();
// to check auth and redirect accordingly
const { ensureAuth, ensureGuest } = require("../middleware/auth");


// @desc Login page
router.get("/", ensureGuest, (_req, res) => {
  res.send('login')
})

router.get("/profile", ensureAuth, (_req, res) => {
  res.send("User Profile")
})

module.exports = router;