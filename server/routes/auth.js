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

const User = require("../models/User");
const UserStrava = require("../models/UserStrava");
const axios = require("axios");

router.get("/strava",
  // passport.authenticate("strava"),
  (req, res) => {
    const redirect_uri = "http://localhost:8080/auth/strava/exchange-token";
    const scope = "activity:read_all,activity:write";

    res.redirect(`http://www.strava.com/oauth/authorize?client_id=76994&response_type=code&redirect_uri=${redirect_uri}&approval_prompt=force&scope=${scope}`)
  }
);

router.get("/strava/exchange-token",
  // passport.authenticate("strava", {
  //   failureRedirect: home,
  // }),
  async (req, res) => {
    console.log("CODE:", req.query.code, "UserId:", req.user.id);

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
    console.log(newStrava);

    // let user = await User.findOne({ id: "61eebe0121a94517c547f220" });

    //   let strava = await UserStrava.find({ user: "61eebe0121a94517c547f220" })

    res.send("We did it")
  }
)


module.exports = router;