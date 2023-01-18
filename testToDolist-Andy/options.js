console.log("Loading options.js");

let blockedURLs = [];

chrome.storage.sync.get(["blockedURLs"], (result) => {
    
    if (result.blockedURLs) {
        
        blockedURLs = result.blockedURLs;

    } 
    
    else {
        
        chrome.storage.sync.set({"blockedURLs": []});
    
    }

});

function addURL(url) {

    console.log("URL being added...");

    let id = blockedURLs.length + 1;

    blockedURLs.push({

        "id": id,

        "priority": 1,

        "action": {"type": "block"},

        "condition": {

            "urlFilter": url,

            "resourceTypes": ["main_frame"]
        }
        
    });

    storeURL();

}

function storeURL() {

    chrome.storage.sync.set({"blockedURLs": blockedURLs});

}

//Block whatever URLS are in the blockedURLs variable
function blockURLs() {

    for (let index = 0; index < blockedURLs.length; index++) {

        let id = blockedURLs[index].id

        console.log(id);

        let domain = blockedURLs[index].condition.urlFilter;

        console.log(domain)

        chrome.declarativeNetRequest.updateDynamicRules({
            
            addRules:[{
                "id": id,

                "priority": 1,

                "action": { "type": "block" },

                "condition": {

                    "urlFilter": domain, 

                    "resourceTypes": ["main_frame"] 

                }

            }],
            
            removeRuleIds: [id]

        });

    };
    
};

const blacklistButton = document.getElementById("Blacklist"); 

blacklistButton.addEventListener("click", () => {

    const blacklistedURL = document.getElementById("blacklistedURL");

    const url = blacklistedURL.value.trim(); //Remove whitespace

    if (url !== "") {

        addURL(blacklistedURL.value);
        
        blacklistedURL.value = '';
        
        blockURLs();
    }

});
