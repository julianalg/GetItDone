let loginForm = document.getElementById("loginForm");
        
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    let username = document.getElementById("username")

    console.log(username.value)

    const input = username.value

    const myArray = input.split(" ");

    let searchQuery = ""


    myArray.forEach(word => {
        searchQuery += word + "+"
        console.log(searchQuery)
    })

    console.log(searchQuery)

    window.location.replace("http://www.google.com/search?q=" + searchQuery);

});
