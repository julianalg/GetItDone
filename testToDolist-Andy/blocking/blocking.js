console.log("Loading blocking.js");
const hpDisplay = document.getElementById("HP");
const workButton = document.getElementById("backToWork")
const bypassButton = document.getElementById("bypass")
let userHP = document.getElementById("backToWork")

chrome.storage.sync.get(["user"], (result) => {
    hpDisplay.innerText = result.user.hp - 5
    chrome.storage.sync.set({"user": {hp: hpDisplay.innerText, level: 0}})

})

chrome.storage.sync.get(["user"], (result) => {
    console.log(result.user.hp)
})

workButton.addEventListener("click", function() {
    window.close()
})

bypassButton.addEventListener("click", function() {
    chrome.storage.sync.get(["user"], (result) => {
        console.log(result.user.hp)
        console.log(result.user.hp - 20)
        chrome.storage.sync.set({"user": {hp: result.user.hp - 20, level: 0}})
    })

    // i need to figure out how to get the URL that the user was attempting to go to 

})



// chrome.storage.sync.get(["user"], (result) => {
    
//     if (result.user) {
        
//         user = result.user;
//     } 
    
//     else {
        
//         chrome.storage.sync.set({"user": {hp: 0, level: 0}});
        
//     }

// });