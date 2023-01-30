console.log("Loading background.js");

chrome.alarms.create("timer",{

    periodInMinutes: 1 / 60

});

chrome.alarms.onAlarm.addListener((alarm) => {

    // Checks what alarm just "rang"
    if (alarm.name == "timer") {

        chrome.storage.local.get(["timeLeft", "isRunning"], (result) => {

            const time = result.timeLeft ?? -1; // If timeLeft hasn't been created/returns null, set to -1 to reset timer.

            const isRunning = result.isRunning ?? true; // If isRunning doesn't exist/returns null, set to true\
            
            // If its not running and time is -1(aka we pressed reset), set timeLeft to null so toDoApp.js can handle it in its displayTime function.

            if (isRunning === false && time === -1) {

                chrome.storage.local.set({

                    timeLeft: null,

                });

                return;

            }

            //If the time is less than 0, reset countdown by setting to null, stop running, and send a notification.

            if (result.timeLeft <= 0) {

                chrome.storage.local.set({

                    timeLeft: null,

                    isRunning: false

                });

                chrome.notifications.create('test', {
                    type: 'basic',
                    iconUrl: './images/icon-128.png',
                    title: 'Focus Mode Complete!',
                    message: 'Congratulations! You completed a Focus Mode Session!',
                    priority: 2
                });

                return;

            }

            // If isRunning is false(aka we pressed stop), don't do anything.

            if (isRunning === false) {

                return;

            }

            // If timer is running, aka isRunning == true and timeLeft != -1, null, or 0

            chrome.storage.local.set({

                timeLeft: time-1

            });

        });
        
    } else {

        chrome.notifications.create('test', {
            type: 'basic',
            iconUrl: './images/icon-128.png',
            title: 'Task due!',
            message: alarm.name,
            priority: 2
        });

        return;

    }

});

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {

        console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");

        if (request.type == "setDueDate") {

            chrome.alarms.create(request.alarmName, {when: request.dueDate});

            sendResponse({success: "Due Date set succesfully!"});

        } else {

            chrome.alarms.create(request.alarmName, {when: request.remindDate});

            sendResponse({success: "Reminder set succesfully!"});

        }
    
        return true;

    }
);
