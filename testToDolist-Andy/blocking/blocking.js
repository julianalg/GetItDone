console.log("Loading blocking.js");
const hpDisplay = document.getElementById("HP");
const workButton = document.getElementById("backToWork")
let userHP = document.getElementById("backToWork")

chrome.storage.sync.get(["user"], (result) => {
    console.log(result.user.hp)
    hpDisplay.innerText = result.user.hp - 5
    chrome.storage.sync.set({"user": {hp: hpDisplay.innerText, level: 0}})

})

chrome.storage.sync.get(["user"], (result) => {
    console.log(result.user.hp)
})

workButton.addEventListener("click", function() {
    window.close()
})


// chrome.storage.sync.get(["user"], (result) => {
    
//     if (result.user) {
        
//         user = result.user;
//     } 
    
//     else {
        
//         chrome.storage.sync.set({"user": {hp: 0, level: 0}});
        
//     }

// });