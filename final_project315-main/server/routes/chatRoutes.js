const router = require("express").Router();
const Question = require("../models/Question");

// GET ALL QUESTIONS
router.get("/", async (req, res) => {
  try {
    let questions = await Question.find().sort({ level: 1 });
    
    // Fallback if DB is not seeded
    if (questions.length === 0) {
        questions = [
            {
                text: "How have you been feeling lately?",
                level: 1,
                category: "General",
                options: [
                    { text: "Mostly good", score: 1, impact: "General" },
                    { text: "Quite stressed", score: 4, impact: "Stress" },
                    { text: "Very low", score: 5, impact: "Depression" }
                ]
            },
            {
                text: "Do you often feel worried or restless?",
                level: 2,
                category: "Anxiety",
                options: [
                    { text: "Never", score: 1, impact: "Anxiety" },
                    { text: "Occasionally", score: 3, impact: "Anxiety" },
                    { text: "Very often", score: 5, impact: "Anxiety" }
                ]
            }
        ];
    }
    res.json(questions);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

module.exports = router;
