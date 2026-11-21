
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Get tasks from backend
async function getTasks() {
    try {
        const response = await fetch("http://localhost:3000/tasks");
        const tasks = await response.json();

        taskList.innerHTML = "";

        tasks.forEach(function(task) {
            const li = document.createElement("li");
            li.textContent = task.task;

            if (task.completed) {
                li.style.textDecoration = "line-through";
                li.style.color = "gray";
            }

            taskList.appendChild(li);
        });

    } catch (error) {
        console.error("Error loading tasks:", error);
    }
}

// Add a new task to the backend
addTaskBtn.addEventListener("click", async function() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ task: taskText })
        });

        if (!response.ok) {
            throw new Error("Failed to add task");
        }

        taskInput.value = "";
        getTasks();

    } catch (error) {
        console.error("Error adding task:", error);
        alert("Could not add task. Please try again.");
    }
});

// Load tasks when page opens

async function getTasks() {
    try {
        const response = await fetch("http://localhost:3000/tasks");
        const tasks = await response.json();

        taskList.innerHTML = "";

        tasks.forEach(function(task) {
            const li = document.createElement("li");

            const span = document.createElement("span");
            span.textContent = task.task;

            if (task.completed) {
                span.style.textDecoration = "line-through";
                span.style.color = "gray";
            }

            // Delete button
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.style.background = "red";
            deleteBtn.style.marginLeft = "10px";

            deleteBtn.addEventListener("click", async function() {
                await fetch(`http://localhost:3000/tasks/${task.id}`, {
                    method: "DELETE"
                });

                
async function getTasks() {
    try {
        const response = await fetch("http://localhost:3000/tasks");
        const tasks = await response.json();

        taskList.innerHTML = "";

        tasks.forEach(function(task) {
            const li = document.createElement("li");

            const span = document.createElement("span");
            span.textContent = task.task;

            if (task.completed) {
                span.style.textDecoration = "line-through";
                span.style.color = "gray";
            }

            // Complete button
            const completeBtn = document.createElement("button");
            completeBtn.textContent = "Complete";
            completeBtn.style.marginLeft = "10px";
            completeBtn.disabled = task.completed;

            completeBtn.addEventListener("click", async function() {
                await fetch(`http://localhost:3000/tasks/${task.id}`, {
                    method: "PUT"
                });

                getTasks();
            });

            // Delete button
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.style.background = "red";
            deleteBtn.style.marginLeft = "10px";

            deleteBtn.addEventListener("click", async function() {
                await fetch(`http://localhost:3000/tasks/${task.id}`, {
                    method: "DELETE"
                });

                getTasks();
            });

            li.appendChild(span);
            li.appendChild(completeBtn);
            li.appendChild(deleteBtn);

            taskList.appendChild(li);
        });

    } catch (error) {
        console.error("Error loading tasks:", error);
    }
}

            });

            li.appendChild(span);
            li.appendChild(deleteBtn);
            taskList.appendChild(li);
        });

    } catch (error) {
        console.error("Error loading tasks:", error);
    }
}



