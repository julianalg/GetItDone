console.log("Loading toDoApp.js");

import User from 'focusGame.js'

let taskList = [];

window.addEventListener("DOMContentLoaded", function() {

    chrome.storage.local.get(["taskList"], (result) => {
        
        if (result.taskList) {
            
            taskList = result.taskList;
        } 
        
        else {
            
            chrome.storage.local.set({"taskList": []});
            
        }
        
        displayTaskList();
        
    });

     const user = User.loadUser()
    
});

//Above code to load variables from storage if possible.

function displayTaskList() {
    
    const taskListElement = document.getElementById("taskList");
    
    const completedTasksElement = document.getElementById("completedTasks");

    taskListElement.innerHTML = ""; //clear rather than append because append logic gets messy fast.
    
    completedTasksElement.innerHTML = "";

    
    // Below code actually starts rendering
    
    for (let i = 0; i < taskList.length; i++) {
        
        const task = taskList[i];
        
        const taskElement = document.createElement("li");

        // If task is completed, make sure it has the right class.
        if (task.completed == true) {
            
            taskElement.classList.add("Completed");
            
        } else {
            
            taskElement.classList.add("Incomplete");
            
        }
        
        console.log(task)

        //Create the text and button component of task element
        
        const taskButton = document.createElement("a");
        
        taskButton.innerText = task.text;
        
        const taskTagButton = document.createElement("button");
        
        taskTagButton.innerText = task.tag;
        
        taskTagButton.classList.add("btn")
        taskTagButton.classList.add("remove-button")

        // Make priority of task reflect what it should be

        if (task.tag === 'High') {
            taskTagButton.classList.add("btn-outline-danger")
        } else if (task.tag === 'Medium') {
            taskTagButton.classList.add("btn-outline-warning")
        } else if (task.tag === 'Low') {
            taskTagButton.classList.add("btn-outline-info")
        } else {
            taskTagButton.classList.add("btn-outline-info")
        }
        
        console.log(task)
        
        /* Task details page Deprecated

        taskButton.addEventListener("click", () => {
            
            if (taskElement.classname == "Completed") {
                
                return;
                
            }
            
            document.querySelector('html').innerHTML = `
            <head>
            <meta charset="UTF-8" /> 
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="toDoTaskStyles.css" />    
            
            <!--- bootstrap -->
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
            
            </head>
            <body>
            
            <span class="header">
            <h2>${taskButton.innerText}</h2>
            <a href="./toDoIndex.html"><button id="back" class="btn btn-outline-danger back-btn">dismiss</button></a>
            </span>
            <br> 
            <p></p>
            
            <div class="due-dates">
            <input type="datetime-local" id="dueDate"></input>
            <br>
            <button class="btn btn-outline-primary addtask" id="setDueDate">Set Due Date</button>
            <input type="text" id="reminderTime"></input>
            <button class="btn btn-outline-primary addtask" id="setReminder">Remind me x minutes before</button>
            </div>
            
            <select id="priorities" name="background" class="widget">
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
                <option value="Null">None</option>
            </select>
            
            </body>
            
            `;
            
            //Essentially, I'm manually replacing the html, then treating it as if I switched to a different html page when I'm really on the same one.
            //This means if, in the future, we want to make this page fancier, we will have to do all the coding below, which means its really ugly, as I said above.
            //It also means if we don't call displayList() or displayCountdown() when we load toDoIndex.html, it will theoretically be a blank page.
            // Use taskButton here rather than task because reasons?
            const setDueDateButton = document.getElementById("setDueDate");
            
            setDueDateButton.addEventListener("click", () => {
                
                console.log("setDueDate button clicked");
                
                task.dueDate = new Date(document.getElementById("dueDate").value);
                
                console.log(task.dueDate);
                
                console.log(task.dueDate.getTime());
                
                (async () => {
                    const response = await chrome.runtime.sendMessage({type: "setDueDate", alarmName: task.text, dueDate: task.dueDate.getTime()});
                    
                    console.log(response);
                    
                })();
            });
            
            const setReminderButton = document.getElementById("setReminder");
            
            setReminderButton.addEventListener("click", () => {
                
                console.log("setReminder button clicked");
                
                task.dueDate = new Date(document.getElementById("dueDate").value);
                
                console.log(task.dueDate);
                
                let reminderTime = document.getElementById("reminderTime").value;
                
                console.log(reminderTime);
                
                let remindDate = task.dueDate - reminderTime*1000*60;
                
                console.log(remindDate);
                
                (async () => {
                    
                    const response = await chrome.runtime.sendMessage({type: "setReminder", alarmName: `Reminder for ${task.text} which is due in ${reminderTime} minutes`, remindDate: remindDate});
                    
                    console.log(response);
                    
                })();
                
            });

            document.querySelector('#priorities').addEventListener("change", function() {
                
                if (this.value === 'High') {

                    taskTagButton.classList.add("btn-outline-danger");

                } else if (this.value === 'Medium') {

                    taskTagButton.classList.add("btn-outline-warning");

                } else if (this.value === 'Low') {

                    taskTagButton.classList.add("btn-outline-info");

                } else {

                    taskTagButton.classList.add("btn-outline-info");

                } 
              
            });
             
        }); */

        // Makes task remove button
        
        const removeButton = document.createElement("button");
        
        removeButton.innerText = "X";
        
        removeButton.classList.add("btn")
        removeButton.classList.add("btn-danger")
        removeButton.classList.add("remove-button")
        
        removeButton.addEventListener("click", () => {
            
            removeTask(i);
            
            displayTaskList(); 

        });
        
        const checkbox = document.createElement("input");
        
        checkbox.type = "checkbox";
        
        checkbox.checked = task.completed; // If task is not completed, it will be unchecked. If task is completed, it will be checked.
        
        checkbox.addEventListener("click", () => {
            
            completeTask(i); //Marks task as complete

            displayTaskList();
            
            user[0].level += 1;
            
            
        });

        // Combines all the elements into 1 task element
        
        taskElement.appendChild(checkbox);
        
        taskElement.appendChild(taskButton);
        
        taskElement.appendChild(taskTagButton);
        
        taskElement.appendChild(removeButton);

        // Appends task element to correct list
        
        if (taskElement.className == "Completed") {
            
            completedTasksElement.appendChild(taskElement);
            
        } else {
            
            taskListElement.appendChild(taskElement);
            
        }
    }
    
}

function addTask(text, urgent1, urgent2, urgent3) {
    
    console.log("Task being added...");

    let tagValue 

    if (urgent1.checked) {
        tagValue = "High"
    } else if (urgent2.checked){
        tagValue = "Medium"
    } else if (urgent3.checked) {
        tagValue = "Low"
    } else {
        tagValue = "No Tag"
    }
    
    taskList.push({
        
        text: text,
        
        completed: false,

        tag: tagValue,
        
        addedDate: new Date()
        
    });
    
    storeList();
    
    console.log(user)
    
}

function removeTask(index) {
    
    console.log("Task being removed...");
    
    taskList.splice(index, 1);
    
    storeList();
    
}

function completeTask(index) {

    //Checks if task is already completed, if so, dont do anything to avoid letting the user get hp for free
    if (taskList[index].completed) {
        
        return;
        
    } else {
        
        taskList[index].completed = !taskList[index].completed;
        
        user[0].hp += 5;
        
        if (user[0].hp % 10) {
            
            user[0].level += 1;
            
        }
        
        chrome.storage.local.set({"user": user});
        
        chrome.notifications.create('HP bonus', {
            type: 'basic',
            iconUrl: './images/icon-128.png',
            title: 'You feel yourself becoming revitalized...',
            message: `Your HP is now ${user[0].hp} and your level is now ${user[0].level}`,
            priority: 2
        });
        
        storeList();
    }
    
}

function storeList() {

    
    chrome.storage.local.set({"taskList": taskList});
    
    const result = [];
    
    for (let i = 0; i < taskList.length; i++) {
        
        result.push(`{Text: ${taskList[i].text}, Completed: ${taskList[i].completed}}`);
        
        console.log(`taskList has been stored as: ${result}`);
        
    }
    
}

const addTaskButton = document.getElementById("addTask"); 

addTaskButton.addEventListener("click", () => {
    
    const taskContent = document.getElementById("taskContent");

    // checks for tags

    const priority1 = document.getElementById("pro1")
    console.log(priority1.checked)

    const priority2 = document.getElementById("pro2")
    console.log(priority2.checked)

    const priority3 = document.getElementById("pro3")
    console.log(priority3)
    
    console.log("add task button was clicked")
    
    const taskText = taskContent.value.trim(); //Remove whitespace
    
    if (taskText !== "") {
        
        addTask(taskContent.value, priority1, priority2, priority3);
        
        taskContent.value = '';
        
        displayTaskList();
        
        console.log()
    }
    
});

var startingMinutes;
var startingSeconds;
var time;

const countdownEl = document.getElementById('countdown');
const startButton = document.getElementById('Start');
const stopButton = document.getElementById("Stop");
const resetButton = document.getElementById("Reset");
const resumeButton = document.getElementById("Resume");

function displayCountdown() {
    
    console.log("Displaying countdown...")
    
    chrome.storage.local.get(["timeLeft"], (result) => {
        
        const time = result.timeLeft;
        
        let minutes = Math.floor(time / 60);
        
        let seconds = time % 60;
        
        seconds = seconds < 10 ? '0' + seconds : seconds;
        
        // Ugly conditionals to make sure it doesn't display weird things.
        
        if (minutes == -1) {
            
            minutes = 0;
            
        }
        
        if (seconds == "0-1") {
            
            seconds = "00";
            
        }
        
        countdownEl.innerText = `${minutes}: ${seconds}`;
        
    });
    
}

function displayChar() {
    
    const hpReadout = document.getElementById("hp-readout");
    
    const lvlReadout = document.getElementById("level-readout");
    
    const charDisplay = document.getElementById("character");

    const goldReadout = document.getElementById("gold-readout");
    
    chrome.storage.local.get(["user"], (result) => {
        
        hpReadout.textContent = "HP: " + result.user[0].hp;
        
        lvlReadout.textContent = "Level: " + result.user[0].level;
        
        charDisplay.src = result.user[0].character;

        goldReadout.textContent = "Gold: " + result.user[0].gold;
        
    });
    
}

displayChar();

setInterval(displayChar, 1000);

displayCountdown();

setInterval(displayCountdown, 1000);

startButton.addEventListener("click", () => {
    
    console.log("Starting countdown...");
    
    // If user does not enter a number, it will default to 25 minutes
    startingMinutes = Number(document.getElementById("StartingMinutes").value);
    
    startingSeconds = Number(document.getElementById("StartingSeconds").value);
    
    time = startingMinutes * 60 + startingSeconds;
    
    if (time <= 0) {
        
        startingMinutes = 25;
        
        startingSeconds = 0;
        
        time = startingMinutes * 60 + startingSeconds;
        
    }
    
    countdownEl.style.color = '#7DD076'
    
    chrome.storage.local.set({
        
        timeLeft: time,
        
        isRunning: true,
        
        backgroundColor: '#7DD076'
        
    });
    
    chrome.notifications.create('test', {
        type: 'basic',
        iconUrl: './images/icon-128.png',
        title: 'Focus Mode started!',
        message: 'You feel incredibly focused...',
        priority: 2
    });
    
    
}); 

stopButton.addEventListener("click", () => {
    
    console.log("Stopping countdown...");
    
    countdownEl.style.color = '#F4CB81'
    
    chrome.storage.local.set({
        
        isRunning: false,
        
    });
    
});

resetButton.addEventListener("click", () => {
    
    console.log("Resetting countdown...");
    
    countdownEl.style.color = '#000000'
    
    chrome.storage.local.set({
        
        timeLeft: -1,
        
        isRunning: false
        
    });
    
}); 

resumeButton.addEventListener("click", () => {
    
    console.log("Pausing Countdown...") ;
    
    chrome.storage.local.set({
        
        isRunning: true,
        
    });
    
});
