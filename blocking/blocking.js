console.log("Loading blocking.js");
let user = [];

const workButton = document.getElementById("backToWork");
const bypassButton = document.getElementById("bypass");

const characterSprites = ["../characters/sprite1.png", "../characters/sprite2.png", "../characters/sprite3.png", "../characters/sprite4.png", "../characters/sprite5.png"];

window.addEventListener("DOMContentLoaded", function() {
    
    console.log("Event listener triggered");
    
    chrome.storage.local.get(["user"], (result) => {
        
        if (result.user) {
            
            user = result.user;
            
            console.log(user);

            console.log("using pre-existing user array");
            
        } else {
            
            console.log("creating new user array");
            
            const randomCharacter = characterSprites[Math.floor(Math.random() * characterSprites.length)];
                        
            user = [{hp: 100, level: 0, character: randomCharacter}];
            
            console.log(user);

            
        }
        
        removeHP(5);
        
        displayHP();
        
    });
    
});

function displayHP() {
    
    const hpDisplay = document.getElementById('HP');
    
    hpDisplay.innerText = user[0].hp;

    const character = document.getElementById('character')

    character.src = user[0].character;

    console.log(user[0].character)
    
    if (user[0].hp <= 0) {
        
        alert("Game over");
        
    }  
    
}

function storeUser() {
    
    chrome.storage.local.set({"user": [{hp: user[0].hp, level: user[0].level, character: user[0].character, gold: user[0].gold}]});
    
}

function removeHP(hp) {
    
    user[0].hp -= hp; 
    
    storeUser();
    
}

workButton.addEventListener("click", function() {
    
    window.close();
    
});



// chrome.storage.local.get(["user"], (result) => {

//     if (result.user) {

//         user = result.user;
//     } 

//     else {

//         chrome.storage.local.set({"user": {hp: 0, level: 0}});

//     }

// });