let taskInput = document.getElementById("taskInput");
let addBtn = document.getElementById("addBtn");
let taskList = document.getElementById("taskList");
let taskCount = document.getElementById("taskCount");
let clearBtn = document.getElementById("clearBtn");

let tasks = [];

// Load tasks when page opens
window.onload = function () {

    let savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
    }

    showTasks();

};

// Add button
addBtn.addEventListener("click", function () {

    addTask();

});

// Press Enter to add
taskInput.addEventListener("keypress", function (event) {

    if (event.key === "Enter") {
        addTask();
    }

});

// Add task
function addTask() {

    let text = taskInput.value.trim();

    if (text === "") {
        alert("Please enter a task.");
        return;
    }

    let task = {

        name: text,
        completed: false

    };

    tasks.push(task);

    saveTasks();

    showTasks();

    taskInput.value = "";

}

// Show all tasks
function showTasks() {

    taskList.innerHTML = "";

    for (let i = 0; i < tasks.length; i++) {

        let li = document.createElement("li");

        let span = document.createElement("span");

        span.innerHTML = tasks[i].name;

        span.className = "task-text";

        if (tasks[i].completed) {

            span.classList.add("completed");

        }

        // Complete task
        span.addEventListener("click", function () {

            tasks[i].completed = !tasks[i].completed;

            saveTasks();

            showTasks();

        });

        // Delete button
        let deleteBtn = document.createElement("button");

        deleteBtn.innerHTML = "Delete";

        deleteBtn.className = "delete-btn";

        deleteBtn.addEventListener("click", function () {

            tasks.splice(i, 1);

            saveTasks();

            showTasks();

        });

        li.appendChild(span);

        li.appendChild(deleteBtn);

        taskList.appendChild(li);

    }

    taskCount.innerHTML = tasks.length;

}

// Save tasks
function saveTasks() {

    localStorage.setItem("tasks", JSON.stringify(tasks));

}

// Clear completed tasks
clearBtn.addEventListener("click", function () {

    let remainingTasks = [];

    for (let i = 0; i < tasks.length; i++) {

        if (tasks[i].completed === false) {

            remainingTasks.push(tasks[i]);

        }

    }

    tasks = remainingTasks;

    saveTasks();

    showTasks();

});