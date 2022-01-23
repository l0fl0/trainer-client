const router = require("express").Router();
const passport = require("passport");
const home = "http://localhost:3000"

// @desc Auth with google
router.get("/google",
  passport.authenticate("google", { scope: ["profile"] })
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

module.exports = router;