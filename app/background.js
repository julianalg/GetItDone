console.log("Loading background.js");

let user = [{hp: 100, level: 0, character: "../characters/sprite1.png", gold: 0}];
characterSprites = ["../characters/sprite1.png", "../characters/sprite2.png", "../characters/sprite3.png", "../characters/sprite4.png", "../characters/sprite5.png"];

chrome.storage.local.get(["user"], (result) => {
        
    if (result.user) {
        
        user = result.user;
        
        console.log(user);
        
        console.log("using pre-existing user array");
        
    } else {
        
        console.log("creating new user array");
        
        const randomCharacter = characterSprites[Math.floor(Math.random() * characterSprites.length)];
                    
        user = [{hp: 100, level: 0, character: randomCharacter, gold: 0}];
        
        console.log(user);

        chrome.storage.local.set({"user": user})

    }

});

chrome.alarms.create("timer",{

    periodInMinutes: 1 / 60

});

chrome.alarms.onAlarm.addListener((alarm) => {

    // Checks what alarm just "rang"
    if (alarm.name == "timer") {

        chrome.storage.local.get(["timeLeft", "isRunning"], (result) => {

            const time = result.timeLeft ?? -1; // If timeLeft hasn't been created/returns null, set to -1 to reset timer.

            const isRunning = result.isRunning ?? true; // If isRunning doesn't exist/returns null, set to true
            
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
                    iconUrl: '../images/icon-128.png',
                    title: 'Focus Mode Complete!',
                    message: 'Congratulations! You completed a Focus Mode Session!',
                    priority: 2
                });

                console.log(user);

                console.log("Timer complete")

                user[0].gold += 1;

                user[0].level += 1;

                console.log(user);

                chrome.storage.local.set({"user": user});

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

        chrome.notifications.create('Task due!', {
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



chrome.storage.onChanged.addListener((changes)=> {

    if (changes.user && changes.user.newValue[0].hp <= 0) {

        console.log("Game Over!");

        chrome.notifications.create('Death', {
            type: 'basic',
            iconUrl: './images/icon-128.png',
            title: 'Game over :(',
            message: 'All character data will be reset',
            priority: 2
        });

        const randomCharacter = characterSprites[Math.floor(Math.random() * characterSprites.length)];
                        
        user = [{hp: 100, level: 0, character: randomCharacter, gold: 0}];

        chrome.storage.local.set({"user": user});

   }

//    if (changes.user && changes.user.newValue[0].level % 2 == 0 && changes.user.newValue[0].level != 0) {

//         console.log(changes);

//         chrome.notifications.create('HP bonus', {
//             type: 'basic',
//             iconUrl: './images/icon-128.png',
//             title: 'You feel yourself becoming revitalized...',
//             message: '',
//             priority: 2
//         });

//         chrome.storage.local.set({"user": [{hp: changes.user.newValue[0].hp + 5, level: changes.user.newValue[0].level, character: user[0].character}]});

//    }

//    chrome.storage.local.get(["isRunning"], (result) => {

//         if (result.isRunning) {

//             chrome.storage.local.set({"user": [{hp: user[0].hp + 5, level: changes.user.newValue[0].level, character: user[0].character}]});

//         }

//    });

});
