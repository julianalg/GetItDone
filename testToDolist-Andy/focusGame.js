console.log("Loading focusGame.js");

let user = [];

const characterSprites = ["characters/sprite1.png", "characters/sprite2.png", "characters/sprite3.png", "characters/sprite4.png", "characters/sprite5.png"]

const character = document.getElementById('character')
const hpReadout = document.getElementById('hp-readout');
const levelReadout = document.getElementById('level-readout')

window.addEventListener("DOMContentLoaded", function() {

    console.log("event listener triggered");

    chrome.storage.sync.get(["user"], (result) => {

        if (result.user) {

            user = result.user;

            console.log(user);

        } else {

            user = [{hp: 100, level: 0, character: characterSprites[Math.floor(Math.random() * characterSprites.length)]}];

            console.log(user);

        }

        displayHP();

    });

    chrome.storage.sync.get([], (result) => {
        console.log(result)
    })

});

function displayHP() {

    hpReadout.innerText = "HP: " + user[0].hp;

    levelReadout.innerText = "Level: " + user[0].level

    character.setAttribute("src", user[0].character)

}

function storeHP() {

    chrome.storage.sync.set({"user": [{hp: user[0].hp, level: user[0].level, character: user[0].character}]});

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
