console.log("Javascript started");

let tasks = [];

if(chrome.storage.sync.get("taskList").then((result) => {

    if(typeof(result) == Array) {

        return true;

    } else {

        return false;

    }

})) {

    chrome.storage.sync.get("taskList").then((result) => {

        tasks = result;

    });

};

/* The ugly code above should check if taskList is in the database.
If it is in the database, it should set tasks to what taskList is in the database.
AKA tasks and the value stored at the key taskList in chrome.storage.sync should be the same.
However, after the code above runs, tasks is undefined. As in typeof(tasks) returns undefined.
This means when we later try to push the task we create to it, it throws an error
*/

console.log(`Tasks: ${tasks}`);

function displayTaskList() {
    
    chrome.storage.sync.get("taskList").then((result) => {

        let lengthOfTasks = result.length

        for(let i = 0; i < lengthOfTasks; i++) {
            
            document.querySelector("ul").append(result[i]);
        
        };

    });

}

/* The above function, for some godforsaken reason, is not doing anything.
Further, the variable, "tasks", no matter how many items I add, always reads [obejct Object].
What is even going on?(I commented out the tasks.push and this is what I get ;-;)
*/

function addItem() {

    const task  = document.createElement("li");

    task.innerText = document.getElementById("taskContent").value;

    task.id = task.innerText;

    console.log(`Task text/ID: ${task.innerText}`)

    //tasks.push(task);

    console.log(`Tasks: ${tasks}`);
 
    displayTaskList();

} 

function removeItem() {

    console.log("Remove button has been pressed");

    console.log(`List of Tasks: ${tasks}`);

}

function testStorage() {

    console.log("Nothing to test");

};

const addTaskButton = document.getElementById("addTask");

const removeTaskButton = document.getElementById("removeTask");

const storageTestButton = document.getElementById("testStorage");

addTaskButton.addEventListener("click", addItem);

removeTaskButton.addEventListener("click", removeItem);

storageTestButton.addEventListener("click", testStorage);

