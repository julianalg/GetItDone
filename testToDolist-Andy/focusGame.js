console.log("Loading focusGame.js");

let hp;
let level; 
let body = document.getElementById("body")
const hpReadout = document.getElementById('hp-readout');
const hpTest = document.getElementById('hp-test');

body.addEventListener("load", function() {
    chrome.storage.sync.get(["user"], (result) => {
        console.log(result.user.hp)
        hpReadout.innerHTML = result.user.hp
    })
})

hpTest.addEventListener("click", function() {
    
    chrome.storage.sync.set({"user": {hp: 69}}, () => {

        if (chrome.runtime.lastError) {

            console.log('Error setting' + chrome.runtime.lastError);

        }
        
    });

    chrome.storage.sync.get(["user"], (result) => {

        console.log(result.user.hp);

        hpReadout.innerHTML = "HP: " + result.user.hp;

    });

});


chrome.storage.sync.set({"user": {
    
    hp: 0, 
    
    level: 0

}});

chrome.storage.sync.get(["user"], (result) => {
    
    console.log(result.user.hp);

    hpReadout.innerHTML = "HP: " + result.user.hp;

}) 
