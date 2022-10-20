const PACMAN = "😉";

const PACMAN_IMG = `<img src="img/pacman.png" />`;
const PACMANSuperPower_IMG = `<img src="img/pacmanSuperPower.png" />`;
const PACMANGRAV_IMG = `<img src="img/pacmanGrave.png" />`;

let gPacman;

function createPacman(board) {
  gPacman = {
    location: {
      i: 2,
      j: 2,
    },

    isSuper: false,
  };

  gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
}

function movePacman(event) {
  let currentPackMan;
  let nextLocation = {
    i: gPacman.location.i,
    j: gPacman.location.j,
  };

  switch (event.key) {
    case "ArrowUp": {
      --nextLocation.i;
      break;
    }
    case "ArrowDown": {
      ++nextLocation.i;
      break;
    }
    case "ArrowLeft": {
      --nextLocation.j;
      break;
    }
    case "ArrowRight": {
      ++nextLocation.j;
      break;
    }
  }

  if (
    gBoard[nextLocation.i][nextLocation.j] === WALL ||
    (gBoard[nextLocation.i][nextLocation.j] === SUPER &&
      gPacman.isSuper === true)
  ) {
    return;
  } else if (gBoard[nextLocation.i][nextLocation.j] === GHOST) {
    if (gPacman.isSuper === false) {
      gGame.isWinner = false;
      gameOver();
      return;
    } else {
      updateScore(100);
      killGhost({ i: nextLocation.i, j: nextLocation.j });
    }
  } else if (gBoard[nextLocation.i][nextLocation.j] === FOOD) {
    --gFood;
    updateScore(5);
    if (gFood === 0) {
      gGame.isWinner = true;
    }
  } else if (gBoard[nextLocation.i][nextLocation.j] === CHERRY) {
    updateScore(50);
  } else if (gBoard[nextLocation.i][nextLocation.j] === SUPER) {
    gPacman.isSuper = true;
    canKIillGhost();
    setTimeout(disableSuperPower, 5000);
    setTimeout(returnGhost, 5000);
    setTimeout(retunNormalGhost, 5000);
  }

  //Update DOM
  removeTagFromCell("img", gPacman.location);

  //Update MODEL
  gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
  gBoard[nextLocation.i][nextLocation.j] = PACMAN;
  gPacman.location = nextLocation;

  //Update DOM
  renderCell(gPacman.location, EMPTY);
  if (gPacman.isSuper === true) {
    currentPackMan = PACMANSuperPower_IMG;
  } else {
    currentPackMan = PACMAN_IMG;
  }
  renderCell(nextLocation, currentPackMan);

  addDirectClass(nextLocation, event.key);

  if (gGame.isWinner === true) {
    gameOver();
    return;
  }
}

function disableSuperPower() {
  gPacman.isSuper = false;
  renderCell(gPacman.location, PACMAN_IMG);
}
