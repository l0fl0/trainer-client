const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const StravaStrategy = require("passport-strava").Strategy;
// const mongoose = require("mongoose");
const User = require("../models/User");
// const UserStrava = require("../models/UserStrava");
// const axios = require("axios");


module.exports = function (passport) {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
    async (accessToken, refreshToken, profile, done) => {
      const newUser = {
        googleId: profile.id,
        email: profile.emails[0].value,
        displayName: profile.displayName,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        image: profile.photos[0].value
      }
      try {
        let user = await User.findOne({ email: profile.emails[0].value })

        if (user) {
          done(null, user)
        } else {
          user = await User.create(newUser)
          done(null, user)
        }

      } catch (err) {
        console.error(err)
      }

    }))

  passport.serializeUser((user, done) => {
    console.log("serialize: ", user);
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
  });

  // passport.use(new StravaStrategy({
  //   clientID: process.env.STRAVA_CLIENT_ID,
  //   clientSecret: process.env.STRAVA_CLIENT_SECRET,
  //   callbackURL: "auth/strava/callback"
  // },
  //   async function (accessToken, refreshToken, profile, done) {

  //     const newStrava = {
  //       athleteId: profile.id,
  //       name: profile.displayName,
  //       accessToken: accessToken,
  //       refreshToken: refreshToken,
  //       profileData: profile._json,
  //       user: "61eebe0121a94517c547f220"
  //     }
  //     // try {
  //     let user = await User.findOne({ id: "61eebe0121a94517c547f220" });

  //     let strava = await UserStrava.find({ user: "61eebe0121a94517c547f220" })

  //     try {
  //       if (strava) {
  //         done(null, user)
  //       } else {
  //         await UserStrava.create(newStrava)
  //         done(null, user)
  //       }
  //     } catch (err) {
  //       console.error(err)
  //     }
  //   }
  // ));

}