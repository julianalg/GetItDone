console.log("Loading focusGame.js");

let user = [];

const hpReadout = document.getElementById('hp-readout');
const hpTest = document.getElementById('hp-test');

window.addEventListener("DOMContentLoaded", function() {

    console.log("event listener triggered");

    chrome.storage.sync.get(["user"], (result) => {

        if (result.user) {

            user = result.user;

            console.log(user);

        } else {

            user = [{hp: 0, level: 0}];

            console.log(user);

        }

        displayHP();

    });

});

function displayHP() {

    const hpReadout = document.getElementById('hp-readout');

    hpReadout.innerText = user[0].hp;

}

function storeHP() {

    chrome.storage.sync.set({"user": [{hp: user[0].hp, level: user[0].level}]});

}

hpTest.addEventListener("click", function() {
    
    user[0].hp += 5;

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
