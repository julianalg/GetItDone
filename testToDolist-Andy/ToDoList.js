console.log("Javascript started");

let tasks = []
console.log(`Tasks: ${tasks}`);


function addItem() {
    
    let ul = document.getElementById("tasklist")
    console.log("Add button has been pressed");
    const task  = document.createElement("li");
    console.log("Task element created")
    task.innerText = document.getElementById("taskContent").value;
    console.log(`Tasks: ${tasks}`)
    const SubmitTask = task.innerHTML
    tasks.push(SubmitTask)
    console.log(tasks)
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(task.innerText));
    ul.appendChild(li);
    console.log("List appended to document");
} 

function removeItem() {
    
    tasks = []
    
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

