module.exports = {
  ensureAuth: (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.redirect("/")
    } else {
      return next();

    }
  },
  ensureGuest: (req, res, next) => {
    if (req.isAuthenticated()) {
      return res.redirect("/profile")
    } else {
      return next()
    }
  }
}