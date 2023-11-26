let playerText = document.getElementById("playerText");
let restartBtn = document.getElementById("restartBtn");
let playerOneScore = document.getElementById("player_x");
let playerTwoScore = document.getElementById("player_y");
let boxes = Array.from(document.getElementsByClassName("box"));
let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks');
const O_player = "O";
const X_player = "X";
let currentP