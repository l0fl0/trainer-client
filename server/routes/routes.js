const router = require("express").Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const Strava_Account = require("../models/Strava_Account");



// @desc Login page
router.get("/", ensureGuest, (_req, res) => {
  res.redirect('http://localhost:3000/login')
})

// @desc Profile data
router.get("/profile", ensureAuth, (req, res) => {
  if (req.user === undefined) return res.status(401).send("Unauthorized");

  res.json(req.user);
})

// @desc Strava data
router.get("/stravaaccount", ensureAuth, async (req, res) => {
  const stravaProfile = await Strava_Account.findOne({ user: req.user.id });

  if (!stravaProfile) return res.status(401).send("Strava Account not found");

  res.json(stravaProfile.profileData)
})

module.exports = router;