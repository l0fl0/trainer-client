const router = require("express").Router();
// to check auth and redirect accordingly
const { ensureAuth, ensureGuest } = require("../middleware/auth");


// @desc Login page
router.get("/", ensureGuest, (_req, res) => {
  res.redirect('http://localhost:3000/login')
})

router.get("/profile", ensureAuth, (req, res) => {
  res.send("User Profile " + req.user.displayName)
})

module.exports = router;