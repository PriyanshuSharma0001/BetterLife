const mongoose = require("mongoose");

const PsychologistSchema = new mongoose.Schema({
  email: String,
  password: String
});

module.exports = mongoose.model("Psychologist", PsychologistSchema);
