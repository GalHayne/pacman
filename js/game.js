const WALL = "#";
const FOOD = "🍗";
const EMPTY = " ";
const CHERRY = "🍒";

let gBoard;
let gSize = 9;
let gCherryInterval;

let gGame = {
  score: 0,
  isWinner: false,
};

function init() {
  //DOM
  document.querySelector(".endGame").innerHTML = "";

  //MODEL
  gFood = gSize * gSize - 1;
  clearGhostsArr();
  updateScore(0);
  removeNewGame();
  addOnKeyUp();
  gBoard = buildBoard();
  createPacman(gBoard);
  createGhosts(gBoard);
  gGame.isWinner = false;
  gCherryInterval = setInterval(createcherry, 15000);

  //DOM
  printMat(gBoard, ".board-container");
}

function addOnKeyUp() {
  let elBody = document.querySelector("body");
  elBody.setAttribute("onkeyup", "movePacman(event)");
}

function buildBoard() {
  let board = [];
  for (let i = 0; i < gSize; ++i) {
    board[i] = [];
    for (let j = 0; j < gSize; ++j) {
      if (
        i === 0 ||
        i === gSize - 1 ||
        j === 0 ||
        j === gSize - 1 ||
        (j === 3 && i > 4 && i < gSize - 2)
      ) {
        board[i][j] = WALL;
      } else {
        board[i][j] = FOOD;
      }
    }
  }
  return board;
}

function updateScore(diff) {
  //MODEL
  gGame.score += diff;
  //DOM
  document.querySelector("h2 span").innerHTML = gGame.score;
}

function gameOver() {
  gGame.score = 0;

  clearTimeout(gIntervalGhosts);
  clearInterval(gCherryInterval);

  if (gGame.isWinner === false) {
    renderCell(gPacman.location, PACMANGRAV_IMG);
  }

  let elBody = document.querySelector("body");
  elBody.removeAttribute("onkeyup");

  addNewGame();

  document.querySelector(".endGame").innerHTML = endGameMsg(gGame.isWinner);
  return;
}

function addNewGame() {
  let elNewGame = document.querySelector(".newGame");

  elNewGame.innerHTML = `<button onclick="init()">New Game</button>`;
}

function removeNewGame() {
  let elNewGame = document.querySelector(".newGame");

  elNewGame.innerHTML = "";
}

function clearBoard() {
  let elBoard = document.querySelector(".board-container");

  elBoard.innerHTML = "";
}

function endGameMsg(isWinner) {
  let msg;
  if (isWinner) {
    msg = "winner :D";
  } else {
    msg = "lose :(";
  }

  return `<h1 class="msg">Hey, you ${msg}</h1>`;
}

function createcherry() {
  let locations = getEmptyCells(gBoard);

  if (location.length !== 0) {
    let location = Math.floor(getRandomInRange(0, locations.length));
    let cherryLocation = locations[location];

    gBoard[cherryLocation.i][cherryLocation.j] = CHERRY;

    renderCell(cherryLocation, CHERRY);
  }
}