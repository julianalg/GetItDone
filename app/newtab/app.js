let taskList = [];

window.addEventListener("DOMContentLoaded", function() {
    
    chrome.storage.local.get(["taskList"], (result) => {
        
        if (result.taskList) {
            
            taskList = result.taskList;
        } 
        
        else {
            
            chrome.storage.local.set({"taskList": []});
            
        }
        
        console.log(taskList)

        loadTasks()
        
    })
})

let loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    let username = document.getElementById("username")
    
    console.log(username.value)
    
    const input = username.value
    
    const myArray = input.split(" ");
    
    let searchQuery = ""
    
    
    myArray.forEach(word => {
        searchQuery += word + "+"
        console.log(searchQuery)
    })
    
    console.log(searchQuery)
    
    window.location.replace("http://www.google.com/search?q=" + searchQuery);
    
});

function loadTasks() {
    const taskListElement = document.getElementById("taskList");
        for (let i = 0; i < taskList.length; i++) {
            
            const task = taskList[i];
            
            const taskElement = document.createElement("li");
            
            
            if (task.completed == true) {
                
                taskElement.classList.add("Completed");
                
            } else {
                
                taskElement.classList.add("Incomplete");
                
            }
            
            console.log(task)
            
            const taskButton = document.createElement("a");
            
            taskButton.innerText = task.text;
            
            const taskTagButton = document.createElement("button");
            
            taskTagButton.innerText = task.tag;
            
            taskTagButton.classList.add("btn")
            taskTagButton.classList.add("remove-button")
            
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
            
            taskButton.addEventListener("click", () => {
                
                if (taskElement.classname == "complete") {
                    
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
                
                </body>
                
                `;
                
                //Essentially, I'm manually replacing the html, then treating it as if I switched to a different html page when I'm really on the same one.
                //This means if, in the future, we want to make this page fancier, we will have to do all the coding below, which means its really ugly, as I said above.
                //It also means if we don't call displayList() or displayCountdown() when we load toDoIndex.html, it will theoretically be a blank page.
                
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
                
            });
            
            
            const removeButton = document.createElement("button");
            
            removeButton.innerText = "X";
            
            removeButton.classList.add("btn")
            removeButton.classList.add("btn-danger")
            removeButton.classList.add("remove-button")
            
            removeButton.addEventListener("click", () => {
                
                removeTask(i);
                
                displayTaskList(); //Display task here rather than in the function because the functions should only modify taskList, not display it.
                
            });
            
            const checkbox = document.createElement("input");
            
            checkbox.type = "checkbox";
            
            checkbox.checked = task.completed; // If task is not completed, it will be unchecked. If task is completed, it will be checked.
            
            checkbox.addEventListener("click", () => {
                
                completeTask(i); //Marks task as complete
                
                
                displayTaskList();
                
                user[0].level += 1;
                
                
                
                
            });
            
            taskElement.appendChild(checkbox);
            
            taskElement.appendChild(taskButton);
            
            taskElement.appendChild(taskTagButton);
            
            
            taskElement.appendChild(removeButton);
            
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