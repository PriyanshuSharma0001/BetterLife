const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  level: { type: Number, required: true }, // 1 to 4
  category: { 
    type: String, 
    enum: ["Anxiety", "Depression", "Relationship", "Family", "Stress", "Loneliness", "General"],
    default: "General"
  },
  options: [
    {
      text: String,
      score: Number,
      impact: String // The category this option impacts
    }
  ]
});

module.exports = mongoose.model("Question", QuestionSchema);
