console.log("Javascript started");

let taskList = [];

chrome.storage.sync.get(["taskList"], function(result) {
    
    if (result.taskList) {
        
        taskList = result.taskList;
    } 
    
    else {
        
        chrome.storage.sync.set({"taskList": []});
    
    }
    
    displayTaskList();

});

//Above code to load taskList from storage if possible.

function displayTaskList() {
    
    const taskListElement = document.getElementById("taskList");

    taskListElement.innerHTML = ""; //clear rather than append because append logic gets messy fast

    for(let i = 0; i < taskList.length; i++) {

        const task = taskList[i];

        const taskElement = document.createElement("li");

        taskElement.classList.add("Incomplete"); //Marks as complete or incomplete for later styling

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

    console.log("Task being added");

    taskList.push({

        text: text,

        completed: false

    });

    storeList();

} 

const addTaskForm = document.getElementById("addTaskForm"); 

addTaskForm.addEventListener("submit", function(event) {

    event.preventDefault() //So we can do things with the info in the form

    const taskContent = document.getElementById("taskContent");

    const taskText = taskContent.value.trim(); //Remove whitespace

    if (taskText !== "") {

        addTask(taskContent.value);
        
        taskContent.value = '';
        
        displayTaskList();
    }

});
