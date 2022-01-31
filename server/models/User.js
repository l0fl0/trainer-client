const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true
  },
  displayName: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  image: {
    type: String,
  },
  certified: {
    type: Boolean,
    default: false
  },
  stravaConnected: {
    type: Boolean,
    default: false
  },
  bio: {
    type: String,
  },
  dob: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
})

module.exports = mongoose.model("User", UserSchema);