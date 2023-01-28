console.log("Loading focusGame.js");

let user;
let body = document.getElementById("body");
const hpReadout = document.getElementById('hp-readout');
const hpTest = document.getElementById('hp-test');

function displayHP() {

    const hpReadout = document.getElementById('hp-readout');

    hpReadout.innerText = user.hp;

}

function storeHP() {

    chrome.storage.sync.set({"user": {hp: user.hp}});

}

body.addEventListener("load", function() {

    chrome.storage.sync.get(["user"], (result) => {

        if (result.user && Object.keys(obj).length === 0 && Object.getPrototypeOf(result.user) === Object.prototype) { 

            console.log(result.user.hp);

            user = result.user;

        } else {

            chrome.storage.sync.set({"user": {hp: 0, level: 0}});

            user = {hp: 0, level: 0}; 

        }

    });

    displayHP();

});

hpTest.addEventListener("click", function() {
    
    user.hp += 5;

    storeHP();

    displayHP();

});

/* Im pretty sure the below code makes it so user hp is always 0
chrome.storage.sync.set({"user": {
    
    hp: 0, 
    
    level: 0

}});

chrome.storage.sync.get(["user"], (result) => {
    
    console.log(result.user.hp);

    hpReadout.innerHTML = "HP: " + result.user.hp;

}) */
