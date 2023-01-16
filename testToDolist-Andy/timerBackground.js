chrome.alarms.create({

    periodInMinutes: 1 / 60

});

chrome.alarms.onAlarm.addListener(() => {

    chrome.storage.local.get(["timeLeft", "isRunning"], (result) => {

        const time = result.timeLeft ?? -1; // If timeLeft hasn't been created/returns null, set to -1 to reset timer.

        const isRunning = result.isRunning ?? true; // If isRunning doesn't exist/returns null, set to false 

        //If the time hits 0, reset countdown by setting to null and stop running

        if (result.timeLeft === 0) {

            chrome.storage.local.set({

                timeLeft: null,

                isRunning: false

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