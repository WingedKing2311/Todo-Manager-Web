let tasks = [];
let currentFilter = "all";

// Add Task
function addTask() {
    const input = document.getElementById("taskInput");
    const priority = document.getElementById("priority").value;

    if (input.value.trim() === "") return;

    const task = {
        text: input.value,
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

    if (tasks.length === 0) {
        list.innerHTML = "<p>No tasks yet</p>";
        return;
    }

    tasks.forEach((task, index) => {

        // Filtering
        if (
            (currentFilter === "completed" && !task.completed) ||
            (currentFilter === "pending" && task.completed)
        ) return;

        const li = document.createElement("li");
        li.classList.add(task.priority.toLowerCase());

        li.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}">
                ${task.text} (${task.priority})
            </span>
            <button onclick="deleteTask(${index})">Delete</button>
        `;

        // Toggle complete
        li.querySelector("span").onclick = () => toggleTask(index);

        list.appendChild(li);
    });
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
        tasks = JSON.parse(data);
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