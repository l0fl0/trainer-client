const router = require("express").Router();
const passport = require("passport");


// @desc Auth with google
router.get("/google", passport.authenticate("google", { scope: ["profile"] }))

// @desc google auth callback
router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/", }),
  (_req, res) => {
    res.redirect("/profile")
  }
)

// @desc Logout user 
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/")

})

module.exports = router;