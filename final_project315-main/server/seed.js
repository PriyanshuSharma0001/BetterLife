const mongoose = require("mongoose");
const Psychologist = require("./models/Psychologist");

mongoose.connect("mongodb://127.0.0.1:27017/happylife")
.then(async () => {
  console.log("MongoDB Connected. Seeding default user...");
  
  const admin = await Psychologist.findOne({ email: "admin@gmail.com" });
  if (admin) {
    console.log("Admin user already exists. Exiting.");
    process.exit(0);
  }

  // The prompt said password is "$2a$10$CwTycUXWue0Thq9StjUM0uJ8c7r8hKkz8Wz5u0Zl8H5yQ5e5Q5e5e" (which matches 123456)
  await Psychologist.create({
    email: "admin@gmail.com",
    password: "$2a$10$CwTycUXWue0Thq9StjUM0uJ8c7r8hKkz8Wz5u0Zl8H5yQ5e5Q5e5e"
  });

  console.log("Admin user inserted successfully.");
  process.exit(0);
})
.catch(err => {
  console.error("Error connecting to MongoDB", err);
  process.exit(1);
});
