let tasks = [];
let currentFilter = "all";

// Add Task
function addTask() {
    const input = document.getElementById("taskInput");
    const priority = document.getElementById("priority").value;

    if (input.value.trim() === "") return;

    const task = {
        text: input.value.trim(),
        completed: false,
        priority: priority
    };

    tasks.push(task);
    saveTasks();
    renderTasks();

    input.value = "";
}

// Render Tasks
function renderTasks() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    let rendered = false;

    tasks.forEach((task, index) => {

        // Filtering
        if (
            (currentFilter === "completed" && !task.completed) ||
            (currentFilter === "pending" && task.completed)
        ) return;

        rendered = true;

        const li = document.createElement("li");

        // Safe priority class
        if (task.priority) {
            li.classList.add(task.priority.toLowerCase());
        }

        li.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}">
                ${task.text} (${task.priority || "Low"})
            </span>
            <button onclick="deleteTask(${index})">Delete</button>
        `;

        // Toggle complete
        li.querySelector("span").onclick = () => toggleTask(index);

        list.appendChild(li);
    });

    if (!rendered) {
        list.innerHTML = "<p>No matching tasks</p>";
    }
}

// Delete Task
function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

// Toggle Complete
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

// Filter Tasks
function filterTasks(type) {
    currentFilter = type;
    renderTasks();
}

// Save to localStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load from localStorage
function loadTasks() {
    const data = localStorage.getItem("tasks");

    if (data) {
        tasks = JSON.parse(data).map(task => ({
            priority: "Low", // fallback for old data
            ...task
        }));
    }

    renderTasks();
}

// Enter key support
document.getElementById("taskInput")
.addEventListener("keypress", function(e) {
    if (e.key === "Enter") addTask();
});

// Load on startup
loadTasks();