const mongoose = require("mongoose");

const Strava_AccountSchema = new mongoose.Schema({
  athleteId: {
    type: Number,
  },
  name: {
    type: String,
  },
  accessToken: {
    type: String,
    required: true
  },

  refreshToken: {
    type: String,
    required: true
  },
  profileData: {
    type: Object,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model("Strava_account", Strava_AccountSchema);