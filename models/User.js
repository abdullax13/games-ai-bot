const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId: String,
  totalPoints: { type: Number, default: 0 },
  games: {
    flags: { type: Number, default: 0 }
  }
});

module.exports = mongoose.model("User", userSchema);
