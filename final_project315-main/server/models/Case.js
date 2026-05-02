const mongoose = require("mongoose");

const CaseSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  score: Number,
  riskLevel: String,
  primaryConcern: String,
  categoryScores: {
    Anxiety: { type: Number, default: 0 },
    Depression: { type: Number, default: 0 },
    Relationship: { type: Number, default: 0 },
    Family: { type: Number, default: 0 },
    Stress: { type: Number, default: 0 },
    Loneliness: { type: Number, default: 0 }
  },
  status: {
    type: String,
    default: "Pending"
  }
}, { timestamps: true });

module.exports = mongoose.model("Case", CaseSchema);
