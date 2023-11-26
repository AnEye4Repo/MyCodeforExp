let playerText = document.getElementById("playerText")
let restartBtn = document.getElementById("restartBtn")
let boxes = Array.from(document.getElementsByClassName("box"))
let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks')
const O_player = "O"
const X_player = "X"
let currentPlayer = X_player
let spaces = Array(9).fill(null)


const startGame = () =>{
    boxes.forEach(box => box.addEventListener('click',boxclicked))
}

function boxclicked(e){
    const id = e.target.id

    if (!spaces[id]){
        spaces[id] = currentPlayer
        e.target.innerText = currentPlayer

        if(playerHasWon() !== false){
            playerText.innerHTML = `${currentPlayer} has won`;

            let winning_blocks = playerHasWon()

            winning_blocks.map( box => boxes[box].style.backgroundColor = winnerIndicator)
            return
        }

        currentPlayer = currentPlayer == X_player ? O_player : X_player
    }
}

const WinningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,4,6],
    [0,3,6],
    [1,4,7],
    [2,5,8]
]

function playerHasWon(){
    for (const condition of WinningCombos) {
        let [a,b,c] = condition
        if (spaces[a] && spaces[a] == spaces[b] && spaces[a] == spaces[c]) {
            return [a,b,c]
        }
    }
    return false
}

restartBtn.addEventListener('click', restart)

function restart(){
    playerText.innerHTML = `TIC TAC TOE`
    spaces.fill(null)
    boxes.forEach( box =>{
        box.innerText = ""
        box.style.backgroundColor=""
    })
    currentPlayer = X_player
}

startGame()