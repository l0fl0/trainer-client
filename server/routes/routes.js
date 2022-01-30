const router = require("express").Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const Strava_Account = require("../models/Strava_Account");
const Trainer = require("../models/Trainer");
const axios = require("axios");



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
// @desc Strava refresh token
//TODO: Auth ensure not working
router.get("/stravaaccount/refresh/:id", async (req, res) => {

  const authLink = "https://www.strava.com/oauth/token";
  const strava = await Strava_Account.findOne({ user: req.params.id });

  const response = await axios
    .post(
      `${authLink}`,
      {
        client_id: process.env.STRAVA_CLIENT_ID,
        client_secret: process.env.STRAVA_CLIENT_SECRET,
        refresh_token: strava.refreshToken,
        grant_type: "refresh_token",
      },
      {
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-type": "application/json",
        },
      }
    );
  await Strava_Account.updateOne({ user: req.params.id }, { accessToken: response.data.access_token })

  res.json({ access_token: response.data.access_token })
})

// @desc Strava data
router.get("/trainer/:id", ensureAuth, async (req, res) => {
  let trainer = await Trainer.findOne({ user: req.params.id });

  if (!trainer) return res.status(401).send("Trainer not found");

  res.json(trainer)
})
module.exports = router;