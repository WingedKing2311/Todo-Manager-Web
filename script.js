let tasks = [];

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

        li.innerHTML = `
            <span style="cursor:pointer; ${task.completed ? 'text-decoration: line-through;' : ''}">
                ${task.text}
            </span>
            <button onclick="deleteTask(${index})">Delete</button>
        `;

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

// Load on startup
loadTasks();