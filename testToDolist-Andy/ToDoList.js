console.log("Javascript started");

let taskList = [];

chrome.storage.sync.get(["taskList"], (result) => {
    
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

    const completedTasksElement = document.getElementById("completedTasks");

    taskListElement.innerHTML = ""; //clear rather than append because append logic gets messy fast.

    completedTasksElement.innerHTML = "";

    // Below code actually starts rendering

    for (let i = 0; i < taskList.length; i++) {

        const task = taskList[i];

        const taskElement = document.createElement("li");

        //Marks as complete or incomplete for later

        if (task.completed == true) {

            taskElement.classList.add("Completed");

        } else {

            taskElement.classList.add("Incomplete");

        }

        taskElement.innerText = task.text;

        const removeButton = document.createElement("button");

        removeButton.innerText = "Remove";

        removeButton.addEventListener("click", () => {

            removeTask(i);

            displayTaskList(); //Display task here rather than in the function because the functions should only modify taskList, not display it.
        
        });
        
        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";

        checkbox.checked = task.completed; // If task is not completed, it will be unchecked. If task is completed, it will be checked.

        checkbox.addEventListener("click", () => {
            
            toggleTask(i); //Saves what happened a few lines above to the taskList
            
            displayTaskList();
        
        });

        taskElement.appendChild(removeButton);

        taskElement.appendChild(checkbox);

        if (taskElement.className == "Completed") {

            completedTasksElement.appendChild(taskElement);

        } else {

            taskListElement.appendChild(taskElement);

        }
    }

}

function addTask(text) {

    console.log("Task being added...");

    taskList.push({

        text: text,

        completed: false

    });

    storeList();

}

function removeTask(index) {

    console.log("Task being removed...");

    taskList.splice(index, 1);

    storeList();

}

function toggleTask(index) {

    taskList[index].completed = !taskList[index].completed;

    storeList();

  }

function storeList() {

    chrome.storage.sync.set({"taskList": taskList});

    const result = [];

    for (let i = 0; i < taskList.length; i++) {

        result.push(`{Text: ${taskList[i].text}, Completed: ${taskList[i].completed}}`);

        console.log(`taskList has been stored as: ${result}`);

    }

}

const addTaskForm = document.getElementById("addTaskForm"); 

addTaskForm.addEventListener("submit", (event) => {

    event.preventDefault() //So we can do things with the info in the form

    const taskContent = document.getElementById("taskContent");

    const taskText = taskContent.value.trim(); //Remove whitespace

    if (taskText !== "") {

        addTask(taskContent.value);
        
        taskContent.value = '';
        
        displayTaskList();
    }

});
