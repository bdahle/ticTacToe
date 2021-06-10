const playerFactory = (name, symbol) => {
  const getName = () => name;
  const getSymbol = () => symbol;
  return { getName, getSymbol };
};

const playerOne = playerFactory("Player One", "X");
const playerTwo = playerFactory("Player Two", "O");

const gameBoardModule = (() => {
  let array = [];
  let playerOneNext = true;
  let numberOfRounds = 0;
  let gameOver = false;

  function updateArray(i) {
    if (indexIsEmpty(i)) {
      let playerSymbol = playerOneNext
        ? playerOne.getSymbol()
        : playerTwo.getSymbol();
      playerOneNext = !playerOneNext;
      array[i] = playerSymbol;
      displayControllerModule.updateTile(i, playerSymbol);
      numberOfRounds++;
      gameOver = isGameOver(i, playerSymbol);
      console.log(gameOver);
    }
  }

  function indexIsEmpty(i) {
    return typeof array[i] === "undefined";
  }

  function isGameOver(i, playerSymbol) {
    return moveIsWinning(i, playerSymbol) || isTie();
  }

  function moveIsWinning(i, playerSymbol) {
    return (
      checkHorizontal(i, playerSymbol) ||
      checkVertical(i, playerSymbol) ||
      checkDiagonals(i, playerSymbol)
    );
  }

  function checkHorizontal(i, playerSymbol) {
    switch (i) {
      case 0:
      case 1:
      case 2:
        return checkArrayHorizontal(0, 2, playerSymbol);
      case 3:
      case 4:
      case 5:
        return checkArrayHorizontal(3, 5, playerSymbol);
      case 6:
      case 7:
      case 8:
        return checkArrayHorizontal(6, 8, playerSymbol);
    }
  }

  function checkArrayHorizontal(first, last, playerSymbol) {
    for (i = first; i < last + 1; i++) {
      if (array[i] !== playerSymbol) {
        return false;
      }
    }
    return true;
  }

  function checkVertical(i, playerSymbol) {
    switch (i) {
      case 0:
      case 3:
      case 6:
        if (array[0] !== playerSymbol) return false;
        if (array[3] !== playerSymbol) return false;
        if (array[6] !== playerSymbol) return false;
        return true;
      case 1:
      case 4:
      case 7:
        if (array[1] !== playerSymbol) return false;
        if (array[4] !== playerSymbol) return false;
        if (array[7] !== playerSymbol) return false;
        return true;
      case 2:
      case 5:
      case 8:
        if (array[2] !== playerSymbol) return false;
        if (array[5] !== playerSymbol) return false;
        if (array[8] !== playerSymbol) return false;
        return true;
    }
  }

  function checkDiagonals(i, playerSymbol) {
    switch (i) {
      case 0:
      case 4:
      case 8:
        if (array[0] !== playerSymbol) return false;
        if (array[4] !== playerSymbol) return false;
        if (array[8] !== playerSymbol) return false;
        return true;
      case 2:
      case 4:
      case 6:
        if (array[2] !== playerSymbol) return false;
        if (array[4] !== playerSymbol) return false;
        if (array[6] !== playerSymbol) return false;
        return true;
    }
  }

  function isTie() {
    return numberOfRounds >= 9;
  }

  return {
    array,
    updateArray,
  };
})();

const displayControllerModule = (() => {
  const gridDimensions = 500;
  let array = [];
  makeGrid();

  function makeGrid(gridSize = 3) {
    const tileSize = gridDimensions / gridSize;
    container.style.gridTemplateColumns = `repeat(${gridSize}, auto)`;
    addTiles(tileSize, gridSize);
  }

  function addTiles(tileSize, gridSize) {
    for (i = 0; i < gridSize * gridSize; i++) {
      const tile = makeTile(tileSize, i);
      container.appendChild(tile);
      array[i] = tile;
    }
  }

  function makeTile(tileSize, i) {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    tile.setAttribute("data-index", i);
    tile.style.backgroundColor = "cyan";
    tile.style.width = `${tileSize}px`;
    tile.style.height = `${tileSize}px`;

    tile.addEventListener("click", function (e) {
      gameBoardModule.updateArray(i);
    });

    return tile;
  }

  function updateTile(i, playerSymbol) {
    const tile = array[i];
    tile.style.backgroundColor =
      playerSymbol === playerOne.getSymbol() ? "red" : "blue";
    tile.innerText = playerSymbol;
  }

  return {
    updateTile,
  };
})();
