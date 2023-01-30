console.log("Loading focusGame.js");

let user = [];

const hpReadout = document.getElementById('hp-readout');
const levelReadout = document.getElementById('level-readout')

window.addEventListener("DOMContentLoaded", function() {

    console.log("event listener triggered");

    chrome.storage.sync.get(["user"], (result) => {

        if (result.user) {

            user = result.user;

            console.log(user);

        } else {

            user = [{hp: 100, level: 0}];

            console.log(user);

        }

        displayHP();

    });

});

function displayHP() {

    const hpReadout = document.getElementById('hp-readout');

    hpReadout.innerText = "HP: " + user[0].hp;

}

function storeHP() {

    chrome.storage.sync.set({"user": [{hp: user[0].hp, level: user[0].level}]});

}


/* Im pretty sure the below code makes it so user hp is always 0
chrome.storage.sync.set({"user": {
    
    hp: 0, 
    
    level: 0

}});

chrome.storage.sync.get(["user"], (result) => {
    
    console.log(result.user.hp);

    hpReadout.innerHTML = "HP: " + result.user.hp;

}) */
