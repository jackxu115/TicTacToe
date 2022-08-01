const elePVP = document.querySelector("#pvpBtn")
const elePVC = document.querySelector("#pvcBtn")
const startBtn = document.querySelector("#startBtn")
const startPage = document.querySelector(".container_startPage")
const container = document.querySelector(".container")
const restartBtn = document.querySelector("#restartBtn")
const gamePage = document.querySelector(".container_gamePage")
const gameItem = document.querySelectorAll(".container_gamePage_gameArea_item")
const gameDot = document.querySelectorAll(".dot")
const playerOneTag = document.querySelector("#playerOne")
const playerTwoTag = document.querySelector("#playerTwo")

let GameChoice = null
let PlayerOne = []
let PlayerTwo = []
let turns = 0
const winningArray = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]

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
        GameBoard.pvpPlay()
    } else if (GameChoice === 'pvpBtn') {
        console.log('pvp game')
        gamePage.setAttribute('style', 'visibility: visible')
        startPage.setAttribute('style', 'visibility: hidden')
        GameBoard.pvpPlay()
    } else {
        alert('please select one of game before start the game')
    }
})

restartBtn.addEventListener('click', () => {
    gamePage.setAttribute('style', 'visibility: hidden')
    startPage.setAttribute('style', 'visibility: visible')
    gameDot.forEach(key => key.textContent = "")
    turns = 0
})


const computerPlay = () => {

}

const GameBoard = (() => {
    const pvpPlay = () => {
        playerOneTag.setAttribute('style', 'border: 2px #00abd5 solid')
        gameItem.forEach(key => key.addEventListener('click', event => {
                const id = event.target.children[0].id
                const input = document.getElementById(`${id}`)
                const index = id.charAt(3)
                console.log(turns)
                if (turns % 2 === 0) {
                    input.textContent = "X"
                    playerOneTag.setAttribute('style', 'border: none')
                    playerTwoTag.setAttribute('style', 'border: 2px #00abd5 solid')
                    PlayerOne.push(index)
                    console.log(PlayerOne)
                } else {
                    input.textContent = "O"
                    playerOneTag.setAttribute('style', 'border: 2px #00abd5 solid')
                    playerTwoTag.setAttribute('style', 'border: none')
                    PlayerTwo.push(index)
                    console.log(PlayerTwo)
                }
                turns++
                }, {once: true}
            )
        )
    }

    const winningCondition = (playerArray) => {
        // playerArray.sort()
        for (let index in winningArray) {
            // console.log(winningArray[index])
            if (playerArray.some(i => winningArray[index].includes(i))) {
                return true
            }
        }

    }

    return {pvpPlay, winningCondition}

})()

play = [1, 8, 5, 2, 6, 9]

for (let index in winningArray) {
    // console.log(winningArray[index])
    if (winningArray[index].every(element => play.includes(element))) {
        console.log('win', winningArray[index])
    } else {
        console.log('lose')
    }
}
