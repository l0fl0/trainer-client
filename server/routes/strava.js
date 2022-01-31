const router = require("express").Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const axios = require("axios");
const Strava_Account = require("../models/Strava_Account");


// @desc Strava data
router.get("/", ensureAuth, async (req, res) => {
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
router.get("/refresh/:id", async (req, res) => {

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

module.exports = router;