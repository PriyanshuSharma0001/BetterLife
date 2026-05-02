const router = require("express").Router();
const Case = require("../models/Case");
const auth = require("../middleware/auth");

// CREATE CASE
router.post("/", async (req, res) => {
  try {
    const newCase = new Case(req.body);
    await newCase.save();
    res.json(newCase);
  } catch (err) {
    res.status(500).json({ msg: "Error creating case" });
  }
});

// GET ALL CASES (Protected)
router.get("/", auth, async (req, res) => {
  try {
    const cases = await Case.find().sort({ createdAt: -1 });
    res.json(cases);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching cases" });
  }
});

// UPDATE STATUS (Protected)
router.put("/:id", auth, async (req, res) => {
  try {
    const updated = await Case.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ msg: "Error updating status" });
  }
});

module.exports = router;
