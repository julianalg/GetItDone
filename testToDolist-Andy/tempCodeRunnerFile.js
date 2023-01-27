body.addEventListener("load", function() {
    chrome.storage.sync.get(["user"], (result) => {
        console.log(result.user.hp)
        hpReadout.innerHTML = result.user.hp
    })
})