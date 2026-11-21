const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Home route
app.get("/", (req, res) => {
    res.send("Welcome to My To-Do List Backend!");
});

// Store tasks in memory
let tasks = [
    { id: 1, task: "Learn HTML", completed: false },
    { id: 2, task: "Learn CSS", completed: false },
    { id: 3, task: "Learn JavaScript", completed: true }
];

// Get all tasks
app.get("/tasks", (req, res) => {
    res.json(tasks);
});

// Add a new task
app.post("/tasks", (req, res) => {
    const newTask = {
        id: Date.now(),
        task: req.body.task,
        completed: false
    };

    tasks.push(newTask);
    res.status(201).json(newTask);
});
// Delete a task
app.delete("/tasks/:id", (req, res) => {
    const taskId = Number(req.params.id);

    tasks = tasks.filter(task => task.id !== taskId);

    res.json({ message: "Task deleted successfully" });
});
// Mark a task as completed
app.put("/tasks/:id", (req, res) => {
    const taskId = Number(req.params.id);

    const task = tasks.find(task => task.id === taskId);

    if (!task) {
        return res.status(404).json({ message: "Task not found" });
    }

    task.completed = true;

    res.json(task);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});