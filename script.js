let tasks = [];

let currentFilter = "all";

// Add Task
function addTask() {
    const input = document.getElementById("taskInput");

    if (input.value.trim() === "") return;

    const task = {
        text: input.value,
        completed: false
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

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.classList.add(task.priority.toLowerCase());

        li.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}">
                ${task.text} (${task.priority})
            </span>
            <button onclick="deleteTask(${index})">Delete</button>
        `;  
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

// Save to localStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load from localStorage
function loadTasks() {
    const data = localStorage.getItem("tasks");

    if (data) {
        tasks = JSON.parse(data);
        renderTasks();
    }
}

const priority = document.getElementById("priority").value;

const task = {
    text: input.value,
    completed: false,
    priority: priority
};

function filterTasks(type) {
    currentFilter = type;
    renderTasks();
}

// Load on startup
loadTasks();