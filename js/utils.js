const WALL_IMG = `<img src="img/wallImg.jpg" />`;

function printMat(mat, selector) {
  let copyNumberOfGhosts = numberOfGhosts;
  let strHTML = `<table class="center" border="0"><tbody>`;
  for (let i = 0; i < mat.length; ++i) {
    strHTML += `<tr>`;
    for (let j = 0; j < mat.length; ++j) {
      let cell = mat[i][j];
      if (cell === PACMAN) {
        cell = PACMAN_IMG;
      } else if (cell === FOOD) {
      } else if (cell === GHOST) {
        cell = gGhosts[copyNumberOfGhosts - 1].ghostType;
        --copyNumberOfGhosts;
      } else if (cell === WALL) {
        cell = WALL_IMG;
        --gFood;
      }
      strHTML += `<td class="cell cell-${i}-${j}">${cell}</td>`;
    }
    strHTML += `<tr>`;
  }
  strHTML += `</tbody></table>`;
  let elContainer = document.querySelector(selector);
  elContainer.innerHTML = strHTML;
}

function renderCell(location, value) {
  let elCell = document.querySelector(`.cell-${location.i}-${location.j}`);
  elCell.innerHTML = value;
}

function removeTagFromCell(tag, location) {
  let selector = getSelector(location);

  let elCellClass = document.querySelector(selector);
  elCellClass.innerHTML = "";
}

function getSelector(location) {
  return `.cell-${location.i}-${location.j}`;
}

function getRandomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

function addDirectClass(location, key) {
  let selector = getSelector(location);
  selector += " img";
  let direct;

  let elCell = document.querySelector(selector);

  switch (key) {
    case "ArrowUp": {
      direct = "up";
      break;
    }
    case "ArrowDown": {
      direct = "down";
      break;
    }
    case "ArrowLeft": {
      direct = "left";
      break;
    }
    case "ArrowRight": {
      direct = "right";
      break;
    }
  }
  elCell.classList.add(direct);
}

function getEmptyCells(board) {
  let emptyCells = [];
  for (let i = 0; i < gSize; ++i) {
    for (let j = 0; j < gSize; ++j) {
      let cell = board[i][j];
      if (cell === EMPTY) {
        emptyCells.push({ i, j });
      }
    }
  }
  return emptyCells;
}
