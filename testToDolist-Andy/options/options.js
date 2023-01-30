console.log("Loading options.js");

const resetHPButton0 = document.getElementById('resetHP0')
const resetHPButton100 = document.getElementById('resetHP100')

import { defaultBlock, defaultAllow } from "../blocking/default-blocking.js";

let blacklistedURLs = [];
let whitelistedURLs = [];
let totalURLIndex = 0; // variable to store the id of each rule rather than generating a random number to avoid duplicate ids
window.addEventListener("DOMContentLoaded", function() {

    chrome.storage.sync.get(["blacklistedURLs"], (result) => {
        
        if (result.blacklistedURLs) {
            
            blacklistedURLs = result.blacklistedURLs;

        } 
        
        else {
            
            chrome.storage.sync.set({"blacklistedURLs": []});
        
        }

        displayURLs();

    });

    chrome.storage.sync.get(["whitelistedURLs"], (result) => {
        
        if (result.whitelistedURLs) {
            
            whitelistedURLs = result.whitelistedURLs;

        } 
        
        else {
            
            chrome.storage.sync.set({"whitelistedURLs": []});
        
        }

        displayURLs();

    });

    chrome.storage.sync.get(["totalURLIndex"], (result) => {
        
        if (result.totalURLIndex) {
            
            totalURLIndex = result.totalURLIndex;

        } 
        
        else {
            
            chrome.storage.sync.set({"totalURLIndex": 0});
        
        }

        displayURLs();

    });

    for (let i = 0; i < defaultBlock.length; i++) {

        addBlacklistURL(defaultBlock[i]);

        blacklistURLs();

        displayURLs();

    }

    for (let i = 0; i < defaultAllow.length; i++) {

        addWhitelistURL(defaultAllow[i]);

        whitelistURLs();

        displayURLs();

    }

});

function addBlacklistURL(url) {

    console.log("URL being added to blacklist...");

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

    storeURL();

}

function addWhitelistURL(url) {

    console.log("URL being added to whitelist...");

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
    })

    storeURL();

}

function removeBlacklistURL(index, id) {

    console.log("URL being removed from blacklist...");

    blacklistedURLs.splice(index, 1);

    totalURLIndex--;

    storeURL();

    chrome.declarativeNetRequest.updateDynamicRules({

        removeRuleIds: [id]

    });

}

function removeWhitelistURL(index, id) {

    console.log("URL being removed from whitelist...");

    whitelistedURLs.splice(index, 1);

    totalURLIndex--;

    storeURL();

    chrome.declarativeNetRequest.updateDynamicRules({

        removeRuleIds: [id]

    });

}

function storeURL() {

    chrome.storage.sync.set({"blacklistedURLs": blacklistedURLs});

    chrome.storage.sync.set({"whitelistedURLs": whitelistedURLs});

    chrome.storage.sync.set({"totalURLIndex": totalURLIndex});

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

function displayURLs() {

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

        removeButton.innerText = "Remove";

        removeButton.addEventListener("click", () => {

            removeBlacklistURL(i, blacklistedURL.id);

            displayURLs();
        
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

        removeButton.innerText = "Remove";

        removeButton.addEventListener("click", () => {

            removeWhitelistURL(i, whitelistedURL.id);

            displayURLs();
        
        });

        URLElement.appendChild(siteURL);

        URLElement.appendChild(removeButton);

        whitelistedSitesEl.appendChild(URLElement);
    }

}

const blacklistButton = document.getElementById("Blacklist"); 
const whitelistButton = document.getElementById("Whitelist");

blacklistButton.addEventListener("click", () => {

    const blacklistedURL = document.getElementById("blacklistedURL");

    const url = blacklistedURL.value.trim(); //Remove whitespace

    if (url !== "") {

        addBlacklistURL(blacklistedURL.value);
        
        blacklistedURL.value = '';
        
        displayURLs();

        blacklistURLs();

        console.log("Urls being blacklisted...");
        
    }

});

whitelistButton.addEventListener("click", () => {

    const whitelistedURL = document.getElementById("whitelistedURL");

    const url = whitelistedURL.value.trim(); //Remove whitespace

    if (url !== "") {

        addWhitelistURL(whitelistedURL.value);
        
        whitelistedURL.value = '';
        
        displayURLs();

        whitelistURLs();

        console.log("Urls being whitelisted...");

    }

});

resetHPButton0.addEventListener("click", () => {
    console.log("reset to 0")
    chrome.storage.sync.set({"user": [{hp: 0, level: 0}]});
    alert("Complete")
})

resetHPButton100.addEventListener("click", () => {
    console.log("reset to 100")
    chrome.storage.sync.set({"user": [{hp: 100, level: 0}]});
    alert("Complete")

})