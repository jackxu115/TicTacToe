const elePVP = document.querySelector("#pvpBtn")
const elePVC = document.querySelector("#pvcBtn")
const startBtn = document.querySelector("#startBtn")
const startPage = document.querySelector(".container_startPage")
const gamePage = document.querySelector(".container_gamePage")
const container = document.querySelector(".container")
const restartBtn = document.querySelector("#restartBtn")
const gameDot = document.querySelectorAll(".dot")
const playerOneTag = document.querySelector("#playerOne")
const playerTwoTag = document.querySelector("#playerTwo")
const resultMSG = document.querySelector("#gameResult")
const resultContent = document.querySelector(".container_gameResult")
const gameArea = document.querySelector(".container_gamePage_gameArea")

let GameChoice = null
let PlayerOne = []
let PlayerTwo = []
let leftNode = [0, 1, 2, 3, 4, 5, 6, 7, 8]
let turns = 0
const winningArray = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
let isStop = true

const choosePVP = event => {
    elePVP.style.backgroundColor = "#00adb5"
    elePVC.style.backgroundColor = "#393e46"
    console.log('pvp')
    GameChoice = "pvp"
}
const choosePVC = event => {
    elePVP.style.backgroundColor = "#393e46"
    elePVC.style.backgroundColor = "#00adb5"
    console.log("pvc")
    GameChoice = "pvc"
}

const startGame = event => {
    console.log(GameChoice)
    if (GameChoice === "pvp") {
        startPage.setAttribute('style', 'visibility: hidden')
        console.log("start", GameChoice)
        playerTwoTag.textContent = "Player Two"
        gameControl.loadGame()
    } else if (GameChoice === "pvc") {
        startPage.setAttribute('style', 'visibility: hidden')
        console.log("start", GameChoice)
        playerTwoTag.textContent = "Computer"
        gameControl.loadGame()
    } else {
        alert("Please make selection before click start game button")
    }
}

elePVP.addEventListener('click', choosePVP)

elePVC.addEventListener('click', choosePVC)

startBtn.addEventListener('click', startGame)


const gameControl = (() => {

    const loadGame = () => {
        gamePage.setAttribute('style', 'visibility: visible')
        console.log("load game", turns)
        playerOneTag.style.border = "2px solid #00adb5"
        playerTwoTag.style.border = "none"
        playerTurn()
    }

    const playerTurn = () => {
        console.log('play turn', turns)
        const gameItem = document.querySelectorAll(".container_gamePage_gameArea_item")
        gameItem.forEach(key => {
            key.addEventListener('click', whoPlay, {once: true})
        })
    }

    const whoPlay = event => {
        console.log('who play', turns)
        if (GameChoice === "pvp") {
            if (turns % 2 === 0) {
                playMove(event, "playerOne")
                turns++
            } else {
                playMove(event, "playerTwo")
                turns++
            }
        } else {
            playMove(event, "playerOne")
            turns++
            computerMove()
        }
    }

    const playMove = (event, string) => {
        const index = parseInt(event.target.children[0].id.charAt(3))
        const input = document.getElementById(`dot${index}`)
        if (string === 'playerOne') {
            playerTwoTag.style.border = "2px solid #00adb5"
            playerOneTag.style.border = "none"
            PlayerOne.push(index)
            input.textContent = "X"
            leftNode = leftNode.filter(e => e !== index)
            console.log('player one', PlayerOne)
            const winner = winningCondition(PlayerOne, "playerOne")
            Endgame(winner)
            // console.log('left node', leftNode)
        } else if (string === 'playerTwo') {
            playerOneTag.style.border = "2px solid #00adb5"
            playerTwoTag.style.border = "none"
            PlayerTwo.push(index)
            input.textContent = "O"
            leftNode = leftNode.filter(e => e !== index)
            console.log('player two', PlayerTwo)
            const winner = winningCondition(PlayerTwo, "playerTwo")
            Endgame(winner)
            // console.log('left node', leftNode)
        }
    }

    const computerMove = () => {
        console.log('computer move', turns)
        playerOneTag.style.border = "2px solid #00adb5"
        playerTwoTag.style.border = "none"
        if (turns < 9) {
            let moveIndex = Math.floor(Math.random() * leftNode.length)
            let num = leftNode[moveIndex]
            document.getElementById(`dot${num}`).textContent = "O"
            document.getElementById(`item${num}`).removeEventListener('click', whoPlay)
            PlayerTwo.push(num)
            leftNode = leftNode.filter(e => e !== num)
            const gameResult = winningCondition(PlayerTwo, 'computer')
            Endgame(gameResult)
            turns++
        }
    }

    const removeEvent = () => {
        console.log('remove event', turns)
        const gameItem = document.querySelectorAll('.container_gamePage_gameArea_item')
        gameItem.forEach(key => {
            key.removeEventListener('click', whoPlay)
        })
    }

    const clearData = () => {
        console.log('clear data')
        while (PlayerOne.length > 0) {
            PlayerOne.pop()
        }
        while (PlayerTwo.length > 0) {
            PlayerTwo.pop()
        }
        leftNode = [0, 1, 2, 3, 4, 5, 6, 7, 8]
        turns = 0
        const dotItem = document.querySelectorAll(".dot")
        dotItem.forEach(key => key.textContent = "")
        resultContent.setAttribute('style', 'visibility: hidden')
        resultMSG.textContent = ""
        playerOneTag.style.border = "none"
        playerTwoTag.style.border = "none"
        console.log('clear data', turns)
    }

    const restart = () => {
        restartBtn.addEventListener('click', () => {
            console.log("restart")
            removeEvent()
            clearData()
            gamePage.setAttribute('style', 'visibility: hidden')
            startPage.setAttribute('style', 'visibility: visible')
            elePVP.style.backgroundColor = "#393e46"
            elePVC.style.backgroundColor = "#393e46"
            GameChoice = null
        })
    }

    const winningCondition = (playerArray, string) => {
        console.log(string, "winning condition")
        for (let index in winningArray) {
            if (winningArray[index].every(element => playerArray.includes(element))) {
                return string
            }
        }
        return "none"
    }

    const Endgame = (result) => {
        console.log("endgame", result)
        if (result === "playerOne") {
            console.log("playerOne win")
            resultContent.setAttribute('style', 'visibility: visible')
            resultMSG.textContent = "Player One Win"
            removeEvent()
        } else if (result === "playerTwo") {
            console.log("playerTwo win")
            resultContent.setAttribute('style', 'visibility: visible')
            resultMSG.textContent = "Player Two Win"
            removeEvent()
        } else if (result === "computer") {
            console.log("computer win")
            resultContent.setAttribute('style', 'visibility: visible')
            resultMSG.textContent = "Computer Win"
            removeEvent()
        } else if (turns === 8) {
            console.log("Tie Game")
            resultContent.setAttribute('style', 'visibility: visible')
            resultMSG.textContent = "Tie Game"
            removeEvent()
        }
    }
    return {playerTurn, playMove, removeEvent, restart, loadGame, clearData, winningCondition, Endgame, computerMove}
})()

gameControl.restart()

