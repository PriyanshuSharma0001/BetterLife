const mongoose = require("mongoose");
const Question = require("./models/Question");

const questions = [
  // Level 1: Warm-up
  {
    text: "How have you been feeling lately?",
    level: 1,
    category: "General",
    options: [
      { text: "Mostly good", score: 1, impact: "General" },
      { text: "A bit off", score: 2, impact: "General" },
      { text: "Quite stressed", score: 4, impact: "Stress" },
      { text: "Very low", score: 5, impact: "Depression" }
    ]
  },
  {
    text: "Is something specific on your mind these days?",
    level: 1,
    category: "General",
    options: [
      { text: "Not really", score: 1, impact: "General" },
      { text: "Work/Studies", score: 3, impact: "Stress" },
      { text: "People/Relationships", score: 3, impact: "Relationship" },
      { text: "Personal struggles", score: 4, impact: "Anxiety" }
    ]
  },
  {
    text: "Do you feel emotionally okay most of the time?",
    level: 1,
    category: "General",
    options: [
      { text: "Yes, definitely", score: 1, impact: "General" },
      { text: "Sometimes", score: 3, impact: "General" },
      { text: "Rarely", score: 5, impact: "Depression" }
    ]
  },

  // Level 2: Exploration
  {
    text: "Do you often feel worried or restless without a clear reason?",
    level: 2,
    category: "Anxiety",
    options: [
      { text: "Never", score: 1, impact: "Anxiety" },
      { text: "Occasionally", score: 3, impact: "Anxiety" },
      { text: "Very often", score: 5, impact: "Anxiety" }
    ]
  },
  {
    text: "Have you been feeling low, unmotivated, or disconnected?",
    level: 2,
    category: "Depression",
    options: [
      { text: "Not at all", score: 1, impact: "Depression" },
      { text: "A little", score: 3, impact: "Depression" },
      { text: "Significantly", score: 5, impact: "Depression" }
    ]
  },
  {
    text: "Are there situations or people causing emotional stress?",
    level: 2,
    category: "Relationship",
    options: [
      { text: "No", score: 1, impact: "Relationship" },
      { text: "Yes, at home", score: 4, impact: "Family" },
      { text: "Yes, in my relationship", score: 4, impact: "Relationship" },
      { text: "Yes, at work", score: 3, impact: "Stress" }
    ]
  },
  {
    text: "Do you feel supported by people around you?",
    level: 2,
    category: "Loneliness",
    options: [
      { text: "Yes, very much", score: 1, impact: "Loneliness" },
      { text: "Somewhat", score: 3, impact: "Loneliness" },
      { text: "Not really", score: 5, impact: "Loneliness" }
    ]
  },

  // Level 3: Deep Reflection
  {
    text: "Do you feel emotionally exhausted even without doing much?",
    level: 3,
    category: "Stress",
    options: [
      { text: "No", score: 1, impact: "Stress" },
      { text: "Sometimes", score: 3, impact: "Stress" },
      { text: "Always", score: 5, impact: "Stress" }
    ]
  },
  {
    text: "Do you find it hard to enjoy things you used to like?",
    level: 3,
    category: "Depression",
    options: [
      { text: "No", score: 1, impact: "Depression" },
      { text: "A bit", score: 3, impact: "Depression" },
      { text: "Yes, it's difficult", score: 5, impact: "Depression" }
    ]
  },
  {
    text: "Do you feel alone even when you are with others?",
    level: 3,
    category: "Loneliness",
    options: [
      { text: "Never", score: 1, impact: "Loneliness" },
      { text: "Sometimes", score: 4, impact: "Loneliness" },
      { text: "Often", score: 5, impact: "Loneliness" }
    ]
  },
  {
    text: "Are your thoughts sometimes overwhelming or hard to control?",
    level: 3,
    category: "Anxiety",
    options: [
      { text: "No", score: 1, impact: "Anxiety" },
      { text: "Yes, occasionally", score: 3, impact: "Anxiety" },
      { text: "Yes, frequently", score: 5, impact: "Anxiety" }
    ]
  },

  // Level 4: Sensitive
  {
    text: "Do you ever feel like things are becoming too difficult to handle?",
    level: 4,
    category: "General",
    options: [
      { text: "Not really", score: 1, impact: "General" },
      { text: "Yes, sometimes", score: 4, impact: "General" },
      { text: "Yes, quite often", score: 5, impact: "General" }
    ]
  },
  {
    text: "Have you been feeling hopeless or stuck lately?",
    level: 4,
    category: "Depression",
    options: [
      { text: "No", score: 1, impact: "Depression" },
      { text: "A little", score: 3, impact: "Depression" },
      { text: "Yes, very much", score: 5, impact: "Depression" }
    ]
  },
  {
    text: "Do you feel like you need someone to talk to urgently?",
    level: 4,
    category: "General",
    options: [
      { text: "No", score: 1, impact: "General" },
      { text: "I think so", score: 4, impact: "General" },
      { text: "Yes, immediately", score: 5, impact: "General" }
    ]
  }
];

async function seed() {
  await mongoose.connect("mongodb://localhost:27017/happylife"); 
  await Question.deleteMany({});
  await Question.insertMany(questions);
  console.log("Chat questions seeded!");
  process.exit();
}

seed();
