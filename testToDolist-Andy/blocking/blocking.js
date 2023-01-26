console.log("Loading blocking.js");

let user = {};

chrome.storage.sync.get(["user"], (result) => {
    
    if (result.user) {
        
        user = result.user;
    } 
    
    else {
        
        chrome.storage.sync.set({"user": {hp: 0, level: 0}});
        
    }

});

user.hp = user.hp-5;

chrome.storage.sync.set({"user": {hp: 0}});

const hpDisplay = document.getElementById("HP");

hpDisplay.innerText = user.hp;
