const startingMinutes = 25
let time = startingMinutes * 60

const countdownEl = document.getElementById('countdown')
const startButton = document.getElementById('Start')


startButton.addEventListener("click", () => 
    setInterval(updateCountdown, 3000)
)

function updateCountdown() { 
    const minutes = Math.floor(time / 60)
    let seconds = time % 60

    seconds = seconds < 10 ? '0' + seconds : seconds

    countdownEl.innerHTML = `${minutes}: ${seconds}`
    time--;
}