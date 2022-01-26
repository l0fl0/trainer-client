const router = require("express").Router();
// to check auth and redirect accordingly
const { ensureAuth, ensureGuest } = require("../middleware/auth");

// @desc Login page
router.get("/", ensureGuest, (_req, res) => {
  res.redirect('http://localhost:3000/login')
})

router.get("/profile", ensureAuth, async (req, res) => {
  if (req.user === undefined) return res.status(401).send("Unauthorized");


  res.json(req.user);
})

module.exports = router;