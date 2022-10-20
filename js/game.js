const WALL = "#";
const FOOD = "🥚";
const EMPTY = " ";
const CHERRY = "🍒";
const SUPER = "💪";

let gBoard;
let gSize = 9;
let gCherryInterval;
let gSuperPowerInterval;

let gGame = {
  score: 0,
  isWinner: false,
};

function init() {
  //DOM
  document.querySelector(".endGame").innerHTML = "";

  //MODEL
  gFood = gSize * gSize - 1;
  gGhostID = 0;
  clearGhostsArr();
  updateScore(0);
  removeNewGame();
  addOnKeyUp();
  gBoard = buildBoard();
  createPacman(gBoard);
  createGhosts(gBoard);
  gGame.isWinner = false;
  gCherryInterval = setInterval(createcherry, 15000);
  gSuperPowerInterval = setInterval(createSuperPower, 20000);

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
  clearInterval(gSuperPowerInterval);

  if (gGame.isWinner === false) {
    renderCell(gPacman.location, PACMANGRAV_IMG);
  }

  let elBody = document.querySelector("body");
  elBody.removeAttribute("onkeyup");

  // document.querySelector(".endGame").innerHTML = endGameMsg(gGame.isWinner);
  document.querySelector(
    ".endGame"
  ).innerHTML = `<div class="endGameMsg">${endGameMsg(
    gGame.isWinner
  )} <button onclick="init()">New Game</button></div>`;
  return;
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

  return `<h1 class="msg">Hey, you ${msg}</h1> <h3>click on button for new game</h3>`;
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

function createSuperPower() {
  let locations = getEmptyCorners();

  for (let i = 0; i < locations.length; ++i) {
    gBoard[locations[i].i][locations[i].j] = SUPER;
    renderCell(locations[i], SUPER);
  }
}
