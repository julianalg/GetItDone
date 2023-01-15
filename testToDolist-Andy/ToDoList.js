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

        const taskTextElement = document.createElement("span");

        taskTextElement.textContent = task.text;

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

        taskElement.appendChild(checkbox);

        taskElement.appendChild(taskTextElement);

        taskElement.appendChild(removeButton);

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

    event.preventDefault(); //So we can do things with the info in the form

    const taskContent = document.getElementById("taskContent");

    const taskText = taskContent.value.trim(); //Remove whitespace

    if (taskText !== "") {

        addTask(taskContent.value);
        
        taskContent.value = '';
        
        displayTaskList();
    }

});

var startingMinutes; //If we declar startingMinutes, startingSeconds, or time right now, they will all be 0 because the document just loaded.
var startingSeconds;
let time;
var timer;

const countdownEl = document.getElementById('countdown');
const startButton = document.getElementById('Start');
const stopButton = document.getElementById("Stop");
const resetButton = document.getElementById("Reset");

startButton.addEventListener("click", () => {

    console.log("Starting countdown...");

    startingMinutes = Number(document.getElementById("StartingMinutes").value);

    startingSeconds = Number(document.getElementById("StartingSeconds").value);

    time = startingMinutes * 60 + startingSeconds;


    timer = setInterval(updateCountdown, 1000);

});

stopButton.addEventListener("click", stopCountdown);

resetButton.addEventListener("click", resetCountdown);

function updateCountdown() {
    
    console.log("Total Time(In seconds): " + time);

    const minutes = Math.floor(time / 60);

    console.log("Minutes: " + minutes);

    let seconds = time % 60;

    console.log("Seconds: " + seconds);

    seconds = seconds < 10 ? '0' + seconds : seconds;

    countdownEl.innerHTML = `${minutes}: ${seconds}`;

    time--;
}

function stopCountdown() {

    console.log("Stopping countdown...");

    clearInterval(timer);

};

function resetCountdown() {

    console.log("Resetting countdown...");

    stopCountdown();

    time = startingMinutes * 60 + startingSeconds;

    countdownEl.innerText = `${startingMinutes}: ${startingSeconds}`;

}
