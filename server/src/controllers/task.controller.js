const Task = require("../models/Task");

/**
 * Create Task
 */
exports.createTask = async (req, res, next) => {
  try {
    const { title } = req.body;

    const task = await Task.create({
      title,
      user: req.user.id
    });

    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

/**
 * Get Tasks (Search + Filter)
 */
exports.getTasks = async (req, res, next) => {
  try {
    const { q, completed } = req.query;

    const query = { user: req.user.id };

    if (q) {
      query.title = { $regex: q, $options: "i" };
    }

    if (completed !== undefined) {
      query.completed = completed === "true";
    }

    const tasks = await Task.find(query).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

/**
 * Update Task
 */
exports.updateTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    next(error);
  }
};

/**
 * Delete Task
 */
exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted" });
  } catch (error) {
    next(error);
  }
};
