console.log("Loading focusGame.js");

let user = [];

const characterSprites = ["../characters/sprite1.png", "../characters/sprite2.png", "../characters/sprite3.png", "../characters/sprite4.png", "../characters/sprite5.png"]

const character = document.getElementById('character');
const hpReadout = document.getElementById('hp-readout');
const levelReadout = document.getElementById('level-readout');

window.addEventListener("DOMContentLoaded", function() {

    chrome.storage.local.get(["user"], (result) => {

        if (result.user) {

            user = result.user;

            console.log(user);

            character.src = user[0].character

        } else {

            const randomCharacter = characterSprites[Math.floor(Math.random() * characterSprites.length)];
    
            user = [{hp: 100, level: 0, character: randomCharacter, gold: 0}];

            character.src = user[0].character

            console.log(user);

        }

        displayHP();

    });

    chrome.storage.local.get([], (result) => {

        console.log(result);

    });

});

function displayHP() {

    hpReadout.innerText = "HP: " + user[0].hp;

    levelReadout.innerText = "Level: " + user[0].level

}

function storeUser() {

    console.log(user[0].character)

    chrome.storage.local.set({"user": [{hp: user[0].hp, level: user[0].level, character: user[0].character, gold: user[0].gold}]});

}

/* Im pretty sure the below code makes it so user hp is always 0
chrome.storage.local.set({"user": {
    
    hp: 0, 
    
    level: 0
}});
chrome.storage.local.get(["user"], (result) => {
    
    console.log(result.user.hp);
    hpReadout.innerHTML = "HP: " + result.user.hp;
}) */