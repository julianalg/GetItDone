console.log("Javascript started");

const tasks = new Array();

console.log(`tasks: ${tasks}`);

function addItem() {

    console.log("Add button has been pressed");

    const task  = document.createElement("li");

    console.log("Task element created");

    task.innerText = document.getElementById("taskContent").value;

    task.id = task.innerText;

    console.log(`Task ID: ${task.id}`)

    console.log(`Task text: ${task.innerText}`)

    console.log("Task text changed");

    tasks.push(task);

    console.log("Task added to list");

    document.querySelector("ul").append(...tasks);

    console.log("List appended to document");

} 

function removeItem() {

    console.log("Remove button has been pressed");

    console.log(`List of Tasks: ${tasks}`)

}

const addTaskButton = document.getElementById("addTask");

const removeTaskButton = document.getElementById("removeTask");

addTaskButton.addEventListener("click", addItem);

removeTaskButton.addEventListener("click", removeItem);

