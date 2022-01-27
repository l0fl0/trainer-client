const mongoose = require("mongoose");

const StravaAccountSchema = new mongoose.Schema({
  athleteId: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  accessToken: {
    type: String,
    required: true
  },
  accessExpireAt: {
    type: Number,
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

module.exports = mongoose.model("StravaAccount", StravaAccountSchema);