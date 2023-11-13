let playerText = document.getElementById("playerText")
let restartBtn = document.getElementById("restartBtn")
let boxes = Array.from(document.getElementsByClassName("box"))

const O_player = "O"
const X_player = "X"
let currentPlayer = X_player
let spaces = Array(9).fill(null)


const startGame = () =>{
    boxes.forEach(box => box.addEventListener('click',boxclicked))
}

function boxclicked(e){
    const id = e.target.id
}

startGame()