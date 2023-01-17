chrome.alarms.create({

    periodInMinutes: 1 / 60

});

chrome.alarms.onAlarm.addListener(() => {

    chrome.storage.local.get(["timeLeft", "isRunning"], (result) => {

        const time = result.timeLeft ?? -1; // If timeLeft hasn't been created/returns null, set to -1 to reset timer.

        const isRunning = result.isRunning ?? true; // If isRunning doesn't exist/returns null, set to false 

        //If the time hits 0, reset countdown by setting to null, stop running, and send a notification.

        if (result.timeLeft === 0) {

            chrome.storage.local.set({

                timeLeft: null,

                isRunning: false

            });

            chrome.notifications.create('test', {
                type: 'basic',
                iconUrl: './images/icon-128.png',
                title: 'TImer Complete',
                message: 'You are awesome!',
                priority: 2
            });

            return;

        }

        // If isRunning is false(aka we pressed stop), don't do anything.

        if (!isRunning) {

            return;

        }

        // If its not running and time is -1(aka we pressed reset), set timeLeft to null so popup.js can handle it in its displayTime function.

        if (!isRunning && timeLeft === -1) {

            chrome.storage.local.set({

                timeLeft: null,

            });

            return;

        }

        chrome.storage.local.set({

            timeLeft: time-1

        });

    });

});

console.log("Here is the blocker thingy");


function blockRequest(details) {
   return {cancel: true};
}

function updateFilters(urls) {
   if(chrome.webRequest.onBeforeRequest.hasListener(blockRequest))
     chrome.webRequest.onBeforeRequest.removeListener(blockRequest);
   chrome.webRequest.onBeforeRequest.addListener(blockRequest, 

   	{urls: ["*://*.facebook.com/*",
   			"*://*.reddit.com/*", 
   			]}, ['blocking']);
}

updateFilters();
