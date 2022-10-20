const GHOST = "😈";

let gGhostID = 0;
let gGhosts = [];
let gGhostsGrav = [];
let gIntervalGhosts;

const numberOfGhosts = 4;

const BLUGHOST = '<img src="img/canKIillGhost.png" ></img>';

function createGhost(board) {
  let ghost = {
    id: gGhostID,
    location: {
      i: 3,
      j: 6,
    },
    currCellContent: FOOD,
    ghostType: `<img src="img/${gGhostID++}.png" ></img>`,
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
    if (gPacman.isSuper === false) {
      gGame.isWinner = false;
      gameOver();
      return;
    } else {
      killGhost(ghost.location);
      gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent;
      renderCell(ghost.location, ghost.currCellContent);
      if (ghost.currCellContent === FOOD) {
        ++gFood;
      }
      setTimeout(returnGhost, 5000);
      return;
    }
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

function killGhost(ghostLocation) {
  let ghostIndex = foundGhostIndex(ghostLocation);
  let removeGhost = gGhosts[ghostIndex];
  gGhostsGrav.push(removeGhost);

  gGhosts.splice(ghostIndex, 1);
  if (removeGhost.currCellContent === FOOD) {
    --gFood;
  }
}

function foundGhostIndex(ghostLocation) {
  for (let i = 0; i < gGhosts.length; ++i) {
    let ghost = gGhosts[i];
    if (
      ghostLocation.i === ghost.location.i &&
      ghostLocation.j === ghost.location.j
    ) {
      return i;
    }
  }
}

function returnGhost() {
  for (let i = 0; i < gGhostsGrav.length; ++i) {
    let ghost = gGhostsGrav[i];
    ghost.location.i = 2;
    ghost.location.j = 2;
    ghost.currCellContent = gBoard[ghost.location.i][ghost.location.j];
    ghost.ghostType = `<img src="img/${ghost.id}.png" ></img>`;
    renderCell(ghost.location, ghost.ghostType);
    gGhosts.push(ghost);
  }

  gGhostsGrav = [];
}

function canKIillGhost() {
  for (let i = 0; i < gGhosts.length; ++i) {
    let ghost = gGhosts[i];
    ghost.ghostType = BLUGHOST;
    renderCell(ghost.location, BLUGHOST);
  }
}

function retunNormalGhost() {
  for (let i = 0; i < gGhosts.length; ++i) {
    let ghost = gGhosts[i];
    ghost.ghostType = `<img src="img/${ghost.id}.png" ></img>`;
    renderCell(ghost.location, ghost.ghostType);
  }
}
