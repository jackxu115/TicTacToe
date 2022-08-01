const elePVP = document.querySelector("#pvpBtn")
const elePVC = document.querySelector("#pvcBtn")
const startBtn = document.querySelector("#startBtn")
const startPage = document.querySelector(".container_startPage")
const container = document.querySelector(".container")
const restartBtn = document.querySelector("#restartBtn")
const gamePage = document.querySelector(".container_gamePage")
const gameItem = document.querySelectorAll(".container_gamePage_gameArea_item")

let GameChoice = null
let PlayerOne = []
let PlayerTwo = []

const activeGameChoice = (evtActive, evtDisable) => {
    if (evtActive.style.backgroundColor === "") {
        evtActive.style = 'background-color: #00adb5'
        evtDisable.style = 'background-color: #393e46'
        GameChoice = evtActive.id
    } else if (evtActive.style.backgroundColor === "rgb(0, 173, 181)") {
        evtActive.style = 'background-color: #393e46'
        GameChoice = null
    } else {
        evtActive.style = 'background-color: #00adb5'
        evtDisable.style = 'background-color: #393e46'
        GameChoice = evtActive.id
    }
}

elePVP.addEventListener('click', () => {
    activeGameChoice(elePVP, elePVC)
})

elePVC.addEventListener('click', () => {
    activeGameChoice(elePVC, elePVP)
})

startBtn.addEventListener('click', () => {
    if (GameChoice === "pvcBtn") {
        console.log('pvc game')
        gamePage.setAttribute('style', 'visibility: visible')
        startPage.setAttribute('style', 'visibility: hidden')
    } else if (GameChoice === 'pvpBtn') {
        console.log('pvp game')
        gamePage.setAttribute('style', 'visibility: visible')
        startPage.setAttribute('style', 'visibility: hidden')
    } else {
        alert('please select one of game before start the game')
    }
})

restartBtn.addEventListener('click', () => {
    gamePage.setAttribute('style', 'visibility: hidden')
    startPage.setAttribute('style', 'visibility: visible')
})


const computerPlay = () => {

}

const GameBoard = (() => {
    const playerOnePlay = () => {
        gameItem.forEach(key => key.addEventListener('click', event => {
                    const id = event.target.children[0].id
                    const input = document.getElementById(`${id}`)
                    input.textContent = "X"
                }, {once: true}
            )
        )
    }

    const playerTwoPlay = () => {
        gameItem.forEach(key => key.addEventListener('click', event => {
                    const id = event.target.children[0].id
                    const input = document.getElementById(`${id}`)
                    input.textContent = "O"
                }, {once: true}
            )
        )
    }



    return {playerOnePlay, playerTwoPlay}

})()

GameBoard.playerOnePlay()
GameBoard.playerTwoPlay()