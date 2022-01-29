const router = require("express").Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const Strava_Account = require("../models/Strava_Account");
const Trainer = require("../models/Trainer");



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
  let strava = await Strava_Account.findOne({ user: req.user.id });


  if (!strava) return res.status(401).send("Strava Account not found");
  if (strava) {
    strava = {
      access_token: strava.accessToken,
      profileData: strava.profileData,
    }
    res.json(strava)
  }
})

// @desc Strava data
router.get("/trainer/:id", ensureAuth, async (req, res) => {
  let trainer = await Trainer.findOne({ user: req.params.id });

  if (!trainer) return res.status(401).send("Trainer not found");

  res.json(trainer)
})
module.exports = router;