console.log("Loading blocking.js");
let user = [];

const workButton = document.getElementById("backToWork");
const bypassButton = document.getElementById("bypass");

window.addEventListener("DOMContentLoaded", function() {

    console.log("Event listener triggered");

    chrome.storage.sync.get(["user"], (result) => {

        if (result.user) {

            user = result.user;

            console.log(user);

        } else {

            user = [{hp: 0, level: 0, character: "characters/sprite1.png"}];

            console.log(user);

        }
        
        removeHP(5);

        displayHP();

    });

});

function displayHP() {

    const hpDisplay = document.getElementById('HP');

    hpDisplay.innerText = user[0].hp;

    if (user[0].hp <= 0) {

        alert("Game over");

    }  

}

function storeHP() {

    chrome.storage.sync.set({"user": [{hp: user[0].hp, level: user[0].level}]});

}

function removeHP(hp) {

    user[0].hp -= hp; 

    storeHP();

}

workButton.addEventListener("click", function() {

    window.close();

});

bypassButton.addEventListener("click", function() {

    console.log(user[0].hp);

    removeHP(20);

    console.log(user[0].hp);

    displayHP();

    // i need to figure out how to get the URL that the user was attempting to go to 

});



// chrome.storage.sync.get(["user"], (result) => {
    
//     if (result.user) {
        
//         user = result.user;
//     } 
    
//     else {
        
//         chrome.storage.sync.set({"user": {hp: 0, level: 0}});
        
//     }

// });