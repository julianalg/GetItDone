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

    console.log(`Tasks: ${tasks}`)

    chrome.storage.local.set({taskNumber: task});

    document.querySelector("ul").append(...tasks);

    console.log("List appended to document");

} 

function removeItem() {

    console.log("Remove button has been pressed");

    console.log(`List of Tasks: ${tasks}`);

}

function testStorage() {

    const element = chrome.storage.local.get("1");

    console.log(element);

    console.log(element.innerText);

}

const addTaskButton = document.getElementById("addTask");

const removeTaskButton = document.getElementById("removeTask");

const storageTestButton = document.getElementById("testStorage");

addTaskButton.addEventListener("click", addItem);

removeTaskButton.addEventListener("click", removeItem);

storageTestButton.addEventListener("click", testStorage);

