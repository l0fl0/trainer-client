const mongoose = require("mongoose");

const TrainerSchema = new mongoose.Schema({
  displayName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
  },
  title: {
    type: String,
  },
  clients: {
    type: Array
  },
  programs: {
    type: Array
  },
  certifications: {
    type: Array
  },
  rating: {
    type: Number
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
})

module.exports = mongoose.model("Trainer", TrainerSchema);