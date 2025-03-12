const express = require("express");
const { Todo } = require("../models");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Create To-Do
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, content } = req.body;
    const todo = await Todo.create({ title, content, isDone: false,  userId: req.user.userId });
    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get User To-Dos
router.get("/", authMiddleware, async (req, res) => {
  try {
    const todos = await Todo.findAll({ where: { userId: req.user.userId } });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update To-Do
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { title, content, isDone } = req.body;
    await Todo.update({ title, content, isDone }, { where: { id: req.params.id, userId: req.user.userId } });
    res.json({ message: "To-Do updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete To-Do
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Todo.destroy({ where: { id: req.params.id, userId: req.user.userId } });
    res.json({ message: "To-Do deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
