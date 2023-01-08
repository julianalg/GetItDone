console.log("Javascript started");

let taskList = [];

chrome.storage.local.get(["taskList"], function(result) {

    if (result.taskList) {

        taskList = result.taskList;

    }

    displayTaskList();

});

chrome.storage.onChanged.addListener(function(changes) {
    
    if ('taskList' in changes) {
      
        taskList = changes.taskList.newValue;
      
      console.log('taskList list reloaded from storage');
      
      displayTaskList();
    
    }
});

//Above code to load taskList from storage if possible.

console.log(`Tasks: ${taskList}`);

function displayTaskList() {
    
    const taskListElement = document.getElementById("taskList");

    taskListElement.innerHTML = "";

    for(let i = 0; i < taskList.length; i++) {

        const task = taskList[i];

        const taskElement = document.createElement("li");

        taskElement.classList.add("Incomplete");

        if (task.completed == true) {

            taskElement.classList.add("Completed");

        }

        taskElement.innerText = task.text;

        taskListElement.appendChild(taskElement);

    }

}

function storeList() {

    chrome.storage.sync.set({"taskList": taskList}).then((value) => {
        
        console.log("taskList is stored as: " + value);
     
    });

}

function addTask(text) {

    taskList.push({

        text: text,

        completed: false

    });

    storeList();

} 

const addTaskForm = document.getElementById("addTaskForm");

addTaskForm.addEventListener("submit", function(event) {

    event.preventDefault() //so we can do things with the info in the form

    const taskContent = document.getElementById("taskContent");

    const taskText = taskContent.value.trim(); //Remove whitespace

    if (taskText !== "") {

        addTask(taskContent.value);
        
        taskContent.value = '';
        
        displayTaskList();
    }

});

chrome.storage.local.get(["taskList"], function(result) {
    
    if (result.taskList) {
        
        taskList = result.taskList;
    } 
    
    else {
        
        chrome.storage.local.set({"taskList": []});
    
    }
    
    displayTaskList();

});
