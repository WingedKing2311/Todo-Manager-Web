let tasks = [];
let currentFilter = "all";

// Add Task
function addTask() {
    const input = document.getElementById("taskInput");
    const priority = document.getElementById("priority").value;
    const dueDate = document.getElementById("dueDate").value;

    const text = input.value.trim();
    if (!text) return;

    const task = {
        text,
        completed: false,
        priority: priority || "Low",
        dueDate: dueDate || ""
    };

    tasks.push(task);

    sortByDate(); // auto sort (nice UX)
    saveTasks();
    renderTasks();

    input.value = "";
    document.getElementById("dueDate").value = "";
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

        if (task.priority) {
            li.classList.add(task.priority.toLowerCase());
        }

        const textSpan = document.createElement("span");
        textSpan.className = task.completed ? "completed" : "";
        textSpan.innerText = `${task.text} (${task.priority})`;

        textSpan.onclick = () => toggleTask(index);

        const due = document.createElement("small");
        due.innerText = `Due: ${task.dueDate || "No date"}`;

        const leftDiv = document.createElement("div");
        leftDiv.appendChild(textSpan);
        leftDiv.appendChild(document.createElement("br"));
        leftDiv.appendChild(due);

        const rightDiv = document.createElement("div");

        const editBtn = document.createElement("button");
        editBtn.innerText = "Edit";
        editBtn.onclick = () => editTask(index);

        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Delete";
        deleteBtn.onclick = () => deleteTask(index);

        rightDiv.appendChild(editBtn);
        rightDiv.appendChild(deleteBtn);

        li.appendChild(leftDiv);
        li.appendChild(rightDiv);

        list.appendChild(li);
    });

    if (!rendered) {
        list.innerHTML = currentFilter === "all"
            ? "<p>No tasks yet</p>"
            : "<p>No matching tasks</p>";
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

// Edit Task
function editTask(index) {
    const newText = prompt("Edit task:", tasks[index].text);
    if (!newText || !newText.trim()) return;

    const newDate = prompt(
        "Edit due date (YYYY-MM-DD):",
        tasks[index].dueDate || ""
    );

    tasks[index].text = newText.trim();
    tasks[index].dueDate = newDate || "";

    saveTasks();
    renderTasks();
}

// Sort Tasks by Due Date
function sortByDate() {
    tasks.sort((a, b) => {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
    });
}

// Filter Tasks
function filterTasks(type) {
    currentFilter = type;
    renderTasks();
}

// Save
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load
function loadTasks() {
    const data = localStorage.getItem("tasks");

    if (data) {
        tasks = JSON.parse(data).map(task => ({
            priority: "Low",
            dueDate: "",
            ...task
        }));
    }

    renderTasks();
}

// Enter key support
document.getElementById("taskInput")
.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTask();
});

// Init
loadTasks();