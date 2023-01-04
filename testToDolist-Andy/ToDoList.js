console.log("Javascript started");
const tasks = new Array();
console.log(`tasks: ${tasks}`);

function addItem() {

    console.log("Button has been pressed");

    const task  = document.createElement("li");

    console.log("Task element created");

    task.innerText = document.getElementById("taskContent").value;

    console.log(`Task text: ${task.innerText}`)

    console.log("Task text changed");

    tasks.push(task);

    console.log("Task added to list");

    document.querySelector("ul").append(...tasks);

    console.log("List appended to document");

} 

const button = document.getElementById("addTask");

button.addEventListener("click", addItem);

