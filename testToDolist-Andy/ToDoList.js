console.log("Javascript started");

const tasks = new Array();

console.log(`Tasks: ${tasks}`);

function addItem() {

    console.log("Add button has been pressed");

    const task  = document.createElement("li");
    
    const taskNumber = tasks.length;

    console.log("Task element created");

    task.innerText = document.getElementById("taskContent").value;

    task.id = task.innerText;

    console.log(`Task ID: ${task.id}`)

    console.log(`Task text: ${task.innerText}`)

    console.log("Task text changed");

    tasks.push(task);

    console.log("Task added to list");

    chrome.storage.local.set({taskNumber: task}).then(() => {

        console.log(`Task should be retrieved here via tasknumber: ${chrome.storage.local.get(taskNumber)}`)

    });

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

