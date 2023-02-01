console.log("Loading options.js");

const resetHPButton0 = document.getElementById('resetHP0')
const resetHPButton100 = document.getElementById('resetHP100')

import { defaultBlock, defaultAllow } from "../blocking/default-blocking.js";

let blacklistedURLs = [];
let whitelistedURLs = [];
let allURLs = [];
let totalURLIndex = 0; // variable to store the id of each rule rather than generating a random number to avoid duplicate ids
let toggle = true; // false = do not load defaults, true = load defaults
window.addEventListener("DOMContentLoaded", function() {

    chrome.storage.sync.get(["allURLs"], (result) => {
        
        if (result.allURLs) {
            
            allURLs = result.allURLs;

        } 
        
        else {
            
            chrome.storage.sync.set({"allURLs": []});
        
        }

    });

    chrome.storage.sync.get(["blacklistedURLs"], (result) => {
        
        if (result.blacklistedURLs) {
            
            blacklistedURLs = result.blacklistedURLs;

        } 
        
        else {
            
            chrome.storage.sync.set({"blacklistedURLs": []});
        
        }

    });

    chrome.storage.sync.get(["whitelistedURLs"], (result) => {
        
        if (result.whitelistedURLs) {
            
            whitelistedURLs = result.whitelistedURLs;

        } 
        
        else {
            
            chrome.storage.sync.set({"whitelistedURLs": []});
        
        }

    });

    chrome.storage.sync.get(["totalURLIndex"], (result) => {
        
        if (result.totalURLIndex) {
            
            totalURLIndex = result.totalURLIndex;

        } 
        
        else {
            
            chrome.storage.sync.set({"totalURLIndex": 0});
        
        }

    });

    chrome.storage.sync.get(["toggle"], (result) => {

        if (result.toggle !== undefined) {

            toggle = result.toggle

        } else {

            chrome.storage.sync.set({"toggle": true});

        }

        if (toggle) {

            for (let i = 0; i < defaultBlock.length; i++) {

                addBlacklistURL(defaultBlock[i]);

                blacklistURLs();

            }

            for (let i = 0; i < defaultAllow.length; i++) {

                addWhitelistURL(defaultAllow[i]);

                whitelistURLs();

            }

        }
        
        displayPage();
    
    });

});

function addBlacklistURL(url) {

    console.log("URL being added to blacklist..."); 

    for (let i = 0; i < allURLs.length; i++) {

        if (allURLs[i].condition.urlFilter == url) {

            return;

        }

    }

    let id = totalURLIndex + 1;
    totalURLIndex++;

    blacklistedURLs.push({

        "id": id,

        "priority": 1,

        "action": {"type": "redirect", "redirect": {"extensionPath": "/blocking/not-allowed.html"}}, 

        "condition": {

            "urlFilter": url,

            "resourceTypes": ["main_frame"]
        }
        
    });

    allURLs.push({

        "id": id,

        "priority": 1,

        "action": {"type": "redirect", "redirect": {"extensionPath": "/blocking/not-allowed.html"}}, 

        "condition": {

            "urlFilter": url,

            "resourceTypes": ["main_frame"]
        }
        
    });

    storeVariables();

}

function addWhitelistURL(url) {

    console.log("URL being added to whitelist...");

    for (let i = 0; i < allURLs.length; i++) {

        if (allURLs[i].condition.urlFilter == url) {

            return;

        }

    }

    let id = totalURLIndex + 1;
    totalURLIndex++;

    whitelistedURLs.push({

        "id": id,

        "priority": 1,

        "action": {"type": "allow"},

        "condition": {

            "urlFilter": url,

            "resourceTypes": ["main_frame"]
        }

    });

    allURLs.push({
    
    "id": id,

    "priority": 1,

    "action": {"type": "allow"},

    "condition": {

        "urlFilter": url,

        "resourceTypes": ["main_frame"]

        }

    });

    storeVariables();

}

function removeBlacklistURL(url) {

    console.log("URL being removed from blacklist...");

    let urlObject;

    for (let i = 0; i < allURLs.length; i++) {

        if (allURLs[i].condition.urlFilter == url) {

            urlObject = allURLs[i];

            break;

        }

    }

    const index = blacklistedURLs.findIndex(urlObject => urlObject.condition.urlFilter === url);

    let id = urlObject.id;

    blacklistedURLs.splice(index, 1);

    chrome.declarativeNetRequest.updateDynamicRules({

        removeRuleIds: [id]

    });

    const allURLsIndex = allURLs.findIndex(urlObject => urlObject.condition.urlFilter === url);

    allURLs.splice(allURLsIndex, 1);

    storeVariables();

}

function removeWhitelistURL(url) {

    console.log("URL being removed from whitelist...");

    let urlObject;

    for (let i = 0; i < allURLs.length; i++) {

        if (allURLs[i].condition.urlFilter == url) {

            urlObject = allURLs[i];

            break;

        }

    }

    const index = whitelistedURLs.findIndex(urlObject => urlObject.condition.urlFilter === url);

    let id = urlObject.id;

    whitelistedURLs.splice(index, 1);

    chrome.declarativeNetRequest.updateDynamicRules({

        removeRuleIds: [id]

    });

    const allURLsIndex = allURLs.findIndex(urlObject => urlObject.condition.urlFilter === url);

    allURLs.splice(allURLsIndex, 1);

    storeVariables();

}

function toggleDefault() {
    
    toggle = !toggle;

    if (toggle) {

        for (let i = 0; i < defaultBlock.length; i++) {

            addBlacklistURL(defaultBlock[i]);

            blacklistURLs();

        }

        for (let i = 0; i < defaultAllow.length; i++) {

            addWhitelistURL(defaultAllow[i]);

            whitelistURLs();

        }

    } else {

        for (let i = 0; i < defaultBlock.length; i++) {

            removeBlacklistURL(defaultBlock[i]);

            blacklistURLs();

        }

        for (let i = 0; i < defaultAllow.length; i++) {

            removeWhitelistURL(defaultAllow[i]);

            whitelistURLs();

        }

    }

    storeVariables();

    displayPage();

}

function storeVariables() {

    chrome.storage.sync.set({"allURLs": allURLs});

    chrome.storage.sync.set({"blacklistedURLs": blacklistedURLs});

    chrome.storage.sync.set({"whitelistedURLs": whitelistedURLs});

    chrome.storage.sync.set({"totalURLIndex": totalURLIndex});

    chrome.storage.sync.set({"toggle": toggle});

}

// Blacklist the URLs in blacklistedURLs using the redirect action
function blacklistURLs() {

    for (let index = 0; index < blacklistedURLs.length; index++) {

        let id = blacklistedURLs[index].id

        console.log(id);

        let domain = blacklistedURLs[index].condition.urlFilter;

        console.log(domain);

        chrome.declarativeNetRequest.updateDynamicRules({
            
            addRules:[{
                "id": id,

                "priority": 1,

                "action": {"type": "redirect", "redirect": {"extensionPath": "/blocking/not-allowed.html"}},

                "condition": {

                    "urlFilter": domain, 

                    "resourceTypes": ["main_frame"] 

                }

            }],
            
            removeRuleIds: [id]

        });

    };
    
};

// Whitelists the URLs in whitelistedURLs by setting the action to allow, overriding the redirect action.
function whitelistURLs() {

    for (let index = 0; index < whitelistedURLs.length; index++) {

        let id = whitelistedURLs[index].id

        console.log(id);

        let domain = whitelistedURLs[index].condition.urlFilter;

        console.log(domain);

        chrome.declarativeNetRequest.updateDynamicRules({
            
            addRules:[{
                "id": id,

                "priority": 1,

                "action": {"type": "allow"},

                "condition": {

                    "urlFilter": domain, 

                    "resourceTypes": ["main_frame"] 

                }

            }],
            
            removeRuleIds: [id]

        });

    };
    
};

function displayPage() {

    const blacklistedSitesEl = document.getElementById("blacklistedSites");

    const whitelistedSitesEl = document.getElementById("whitelistedSites");

    blacklistedSitesEl.innerHTML = ""; 

    whitelistedSitesEl.innerHTML = "";

    console.log("Url's being displayed...");

    // Below code renders the blacklisted URLS

    for (let i = 0; i < blacklistedURLs.length; i++) {

        const blacklistedURL = blacklistedURLs[i];

        const URLElement = document.createElement("li");

        URLElement.classList.add("blacklisted");

        const siteURL = document.createElement("span");

        siteURL.textContent = blacklistedURL.condition.urlFilter;

        const removeButton = document.createElement("button");

        removeButton.innerText = "X";

        // adds bootstrap and style classes
        removeButton.classList.add("btn")
        removeButton.classList.add("btn-danger")
        removeButton.classList.add("remove-button")



        removeButton.addEventListener("click", () => {

            removeBlacklistURL(blacklistedURL.condition.urlFilter);

            displayPage();
        
        });

        URLElement.appendChild(siteURL);

        URLElement.appendChild(removeButton);

        blacklistedSitesEl.appendChild(URLElement);
    }

    // Below code renders the whitelisted URLs

    for (let i = 0; i < whitelistedURLs.length; i++) {

        const whitelistedURL = whitelistedURLs[i];

        const URLElement = document.createElement("li");

        URLElement.classList.add("whitelisted");

        const siteURL = document.createElement("span");

        siteURL.textContent = whitelistedURL.condition.urlFilter;

        const removeButton = document.createElement("button");

        removeButton.innerText = "X";

        // adds bootstrap and style classes
        removeButton.classList.add("btn")
        removeButton.classList.add("btn-danger")
        removeButton.classList.add("remove-button")


        removeButton.addEventListener("click", () => {

            removeWhitelistURL(whitelistedURL.condition.urlFilter);

            displayPage();
        
        });

        URLElement.appendChild(siteURL);

        URLElement.appendChild(removeButton);

        whitelistedSitesEl.appendChild(URLElement);
    }

    const toggleBox = document.getElementById("toggleEl");

    toggleBox.checked = toggle;

}

const blacklistButton = document.getElementById("Blacklist"); 
const whitelistButton = document.getElementById("Whitelist");
const toggleBox = document.getElementById("toggleEl");

toggleBox.addEventListener("click", () => {

    console.log("Toggle clicked");

    toggleDefault();

    toggleBox.checked = toggle;

});

blacklistButton.addEventListener("click", () => {

    const blacklistedURL = document.getElementById("blacklistedURL");

    const url = blacklistedURL.value.trim(); //Remove whitespace

    if (url !== "") {

        addBlacklistURL(blacklistedURL.value);
        
        blacklistedURL.value = '';

        blacklistURLs();

        displayPage();

        console.log("Urls being blacklisted...");
        
    }

});

whitelistButton.addEventListener("click", () => {

    const whitelistedURL = document.getElementById("whitelistedURL");

    const url = whitelistedURL.value.trim(); //Remove whitespace

    if (url !== "") {

        addWhitelistURL(whitelistedURL.value);
        
        whitelistedURL.value = '';

        whitelistURLs();

        displayPage();

        console.log("Urls being whitelisted...");

    }

});

resetHPButton0.addEventListener("click", () => {
    console.log("reset to 0")
    const newCharacter = generateCharacter()
    chrome.storage.sync.set({"user": [{hp: 100, level: 0, character: newCharacter}]});
    chrome.storage.sync.set({"user": [{hp: 0, level: 0}]});
    alert("Complete")
})

resetHPButton100.addEventListener("click", () => {
    console.log("reset to 100")
    const newCharacter = generateCharacter()
    chrome.storage.sync.set({"user": [{hp: 100, level: 0, character: newCharacter}]});
    alert("Complete")

})

const characterSprites = ["characters/sprite1.png", "characters/sprite2.png", "characters/sprite3.png", "characters/sprite4.png", "characters/sprite5.png"]


function generateCharacter() {
    const randomCharacter = characterSprites[Math.floor(Math.random() * characterSprites.length)];

    return randomCharacter
}