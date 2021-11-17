const mongoose = require("mongoose");

const seekerSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  password: String,
  email: String,
  phone: String,
  experience: String,
  location: String,
  gender: String,
  interests:String
});

module.exports = mongoose.model("Seeker", seekerSchema);
