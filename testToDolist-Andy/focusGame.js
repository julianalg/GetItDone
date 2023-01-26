let hp;
let level; 

const hpReadout = document.getElementById('hp-readout')
const hpTest = document.getElementById('hp-test')

hpTest.addEventListener("click", function() {
    
    chrome.storage.local.set({user: {hp: 69}}, () => {

        if (chrome.runtime.lastError) {

            console.log('Error setting');

        }
        
        console.log('Stored name: ' + value.name);
    })

    chrome.storage.local.get(["user"], (result) => {

        console.log(result.hp);

        hpReadout.innerHTML = "HP: " + result.user.hp;

    });

});


chrome.storage.local.set({"user": {
    
    hp: 0, 
    
    level: 0

}});

chrome.storage.local.get(["user"], (result) => {
    
    console.log(result.user.hp);

    hpReadout.innerHTML = "HP: " + result.user.hp;

}) 
