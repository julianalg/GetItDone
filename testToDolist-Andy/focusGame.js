let hp;
let level; 

const hpReadout = document.getElementById('hp-readout')
const hpTest = document.getElementById('hp-test')

hpTest.addEventListener("click", function() {
    chrome.storage.local.set({hp: 69}, () => {
        if (chrome.runtime.lastError) {
            console.log('Error setting');
        }
        
        console.log('Stored name: ' + value.name);
    })

    chrome.storage.local.get(["hp"], (result) => {
        console.log(result.hp)
        hpReadout.innerHTML = "HP: " + result.hp
    }) 
});


chrome.storage.local.set({
    
    hp: 0, 
    
    level: 0
    
});

chrome.storage.local.get(["hp"], (result) => {
    console.log(result.hp)
    hpReadout.innerHTML = "HP: " + result.hp
}) 
