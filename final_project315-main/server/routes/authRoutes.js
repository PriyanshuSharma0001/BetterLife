const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Psychologist = require("../models/Psychologist");

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login attempt for:", email);
    const user = await Psychologist.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Expert account not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "secret");
    res.json({ token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ msg: "Server error during login" });
  }
});

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log("Signup attempt for:", email);
    const existingUser = await Psychologist.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: "This expert already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new Psychologist({ email, password: hashedPassword });
    await newUser.save();
    console.log("Account created successfully");

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET || "secret");
    res.json({ token });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ msg: "Server error during signup" });
  }
});

module.exports = router;
