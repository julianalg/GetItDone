console.log("Loading blocking.js");
let user = [];

const workButton = document.getElementById("backToWork");
const bypassButton = document.getElementById("bypass");

const characterSprites = ["../characters/sprite1.png", "../characters/sprite2.png", "../characters/sprite3.png", "../characters/sprite4.png", "../characters/sprite5.png"]


window.addEventListener("DOMContentLoaded", function() {
    
    console.log("Event listener triggered");
    
    chrome.storage.sync.get(["user"], (result) => {
        
        if (result.user) {
            
            user = result.user;
            
            console.log(user);

            user[0].character = "../" + user[0].character
            
            console.log("using pre-existing user array")
            
        } else {
            
            console.log("creating new user array")
            
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

function storeHP() {
    
    chrome.storage.sync.set({"user": [{hp: user[0].hp, level: user[0].level, character: user[0].character}]});
    
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
    
    confirm("This will subtract 20 points from your HP. Are you sure you want to proceed?")
    
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