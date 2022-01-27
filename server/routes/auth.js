const router = require("express").Router();
const passport = require("passport");
const home = "http://localhost:3000";

// @desc Auth with google
router.get("/google",
  passport.authenticate("google", {
    scope: ["email", "profile"]
  }),
  (req, res) => console.log("Google auth hit")
);

// @desc google auth callback
router.get("/google/callback",
  passport.authenticate("google", {
    successRedirect: `${home}/profile`,
    failureRedirect: home,
  })
);


// @desc Logout user 
router.get("/logout",
  (req, res) => {
    req.logout();
    res.redirect(`${home}/login`);
  }
);

//
// STRAVA Auth
//
const User = require("../models/User");
const StravaAccount = require("../models/StravaAccount");
const axios = require("axios");



router.get("/strava",
  async (req, res) => {

    let initialResponse = await axios.post(`https://www.strava.com/oauth/token?client_id=${process.env.STRAVA_CLIENT_ID}&client_secret=${process.env.STRAVA_CLIENT_SECRET}&code=${req.query.code}&grant_type=authorization_code`);

    const { athlete, access_token, expires_at, refresh_token } = initialResponse.data;

    const newStrava = {
      athleteId: athlete.id,
      name: `${athlete.firstname} ${athlete.lastname}`,
      accessToken: access_token,
      accessExpireAt: expires_at,
      refreshToken: refresh_token,
      profileData: athlete,
      user: req.user.id
    }

    try {
      let strava = await StravaAccount.findOne({ user: req.user.id });

      if (!strava) {
        strava = await StravaAccount.create(newStrava);
      }

    } catch (err) {
      console.log("stravaaccount write", err);
    }

    res.redirect(`${home}/profile`)
  }
)


module.exports = router;