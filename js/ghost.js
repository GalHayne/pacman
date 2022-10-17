const GHOST = "😈";
let gGhosts = [];
let gIntervalGhosts;
const numberOfGhosts = 3;

function createGhost(board) {
  let ghost = {
    location: {
      i: 3,
      j: 6,
    },
    currCellContent: FOOD,
    ghostType: `<img src="img/${gGhosts.length}.png" ></img>`,
  };

  //MODEL
  gGhosts.push(ghost);
  board[ghost.location.i][ghost.location.j] = GHOST;
}
function createGhosts(board) {
  for (let i = 0; i < numberOfGhosts; ++i) {
    createGhost(board);
  }
  gIntervalGhosts = setInterval(moveGhosts, 1000);
}

function moveGhosts() {
  for (let i = 0; i < gGhosts.length; ++i) {
    let currentGhost = gGhosts[i];
    moveGhost(currentGhost);
  }
}

function moveGhost(ghost) {
  let moveDiff = getMoveDiff();

  let nextLocation = {
    i: ghost.location.i + moveDiff.i,
    j: ghost.location.j + moveDiff.j,
  };

  let nextCell = gBoard[nextLocation.i][nextLocation.j];
  if (nextCell === WALL || nextCell === GHOST) {
    return;
  } else if (nextCell === PACMAN) {
    gGame.isWinner = false;
    gameOver();
    return;
  }

  //Update Model
  gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent;

  //Update DOM
  renderCell(ghost.location, ghost.currCellContent);

  //Update Model
  ghost.location = nextLocation;
  ghost.currCellContent = nextCell;
  gBoard[nextLocation.i][nextLocation.j] = GHOST;

  //Update DOM
  renderCell(nextLocation, ghost.ghostType);
}

function getMoveDiff() {
  let randomNum = getRandomInRange(1, 101);

  if (randomNum <= 25) {
    return { i: 0, j: 1 };
  } else if (randomNum <= 50) {
    return { i: 1, j: 0 };
  } else if (randomNum <= 75) {
    return { i: -1, j: 0 };
  } else if (randomNum <= 100) {
    return { i: 0, j: -1 };
  } else {
    return { i: 0, j: 0 };
  }
}

function clearGhostsArr() {
  gGhosts = [];
}
