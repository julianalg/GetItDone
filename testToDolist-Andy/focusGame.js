console.log("Loading focusGame.js");

let localHp;
let level; 
let body = document.getElementById("body");
const hpReadout = document.getElementById('hp-readout');
const hpTest = document.getElementById('hp-test');

function displayHP() {

    const hpReadout = document.getElementById('hp-readout');

    hpReadout.innerText = localHp;

}

function storeHP() {

    chrome.storage.sync.set({"user": {hp: localHp}});

}

body.addEventListener("load", function() {

    chrome.storage.sync.get(["user"], (result) => {

        console.log(result.user.hp);

        hp = result.user.hp;

    });

    displayHP();

});

hpTest.addEventListener("click", function() {
    
    hp += 5;

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
