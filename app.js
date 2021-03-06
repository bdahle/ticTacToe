const playerFactory = (name, symbol, color) => {
  const getName = () => name;
  const getSymbol = () => symbol;
  const getColor = () => color;
  return { getName, getSymbol, getColor };
};

const playerOne = playerFactory("Red player", "X", "red");
const playerTwo = playerFactory("Blue player", "O", "blue");

const gameBoardModule = (() => {
  let array = [];
  let currentPlayer = playerTwo;
  let numberOfRounds = 0;
  let gameOver = false;

  function makeRandomMove() {
    if (!gameOver) {
      let index;
      while (!index) {
        let candidateIndex = Math.floor(Math.random() * 9);
        if (indexIsEmpty(candidateIndex)) index = candidateIndex;
      }
      makeMove(index);
    }
  }

  function makeMove(i) {
    if (!gameOver) {
      if (indexIsEmpty(i)) {
        if (currentPlayer == playerOne) {
          currentPlayer = playerTwo;
        } else if (currentPlayer == playerTwo) {
          currentPlayer = playerOne;
        }
        array[i] = currentPlayer.getSymbol();
        displayControllerModule.updateTile(i, currentPlayer);
        numberOfRounds++;

        const resultText = document.getElementById("result");
        if (isMoveWinning(i, currentPlayer)) {
          gameOver = true;
          resultText.innerText = currentPlayer.getName() + " won!";
        } else if (isTie()) {
          resultText.innerText = "Tie!";
          gameOver = true;
        }
        return true;
      }
    }
  }

  function indexIsEmpty(i) {
    return typeof array[i] === "undefined";
  }

  function isMoveWinning(i, currentPlayer) {
    return (
      checkHorizontal(i, currentPlayer) ||
      checkVertical(i, currentPlayer) ||
      checkDiagonals(i, currentPlayer)
    );
  }

  function checkHorizontal(i, currentPlayer) {
    switch (i) {
      case 0:
      case 1:
      case 2:
        return checkArrayHorizontal(0, 2, currentPlayer);
      case 3:
      case 4:
      case 5:
        return checkArrayHorizontal(3, 5, currentPlayer);
      case 6:
      case 7:
      case 8:
        return checkArrayHorizontal(6, 8, currentPlayer);
    }
  }

  function checkArrayHorizontal(first, last, currentPlayer) {
    for (i = first; i < last + 1; i++) {
      if (array[i] !== currentPlayer.getSymbol()) {
        return false;
      }
    }
    return true;
  }

  function checkVertical(i, currentPlayer) {
    switch (i) {
      case 0:
      case 3:
      case 6:
        if (array[0] !== currentPlayer.getSymbol()) return false;
        if (array[3] !== currentPlayer.getSymbol()) return false;
        if (array[6] !== currentPlayer.getSymbol()) return false;
        return true;
      case 1:
      case 4:
      case 7:
        if (array[1] !== currentPlayer.getSymbol()) return false;
        if (array[4] !== currentPlayer.getSymbol()) return false;
        if (array[7] !== currentPlayer.getSymbol()) return false;
        return true;
      case 2:
      case 5:
      case 8:
        if (array[2] !== currentPlayer.getSymbol()) return false;
        if (array[5] !== currentPlayer.getSymbol()) return false;
        if (array[8] !== currentPlayer.getSymbol()) return false;
        return true;
    }
  }

  function checkDiagonals(i, currentPlayer) {
    switch (i) {
      case 0:
      case 4:
      case 8:
        if (array[0] !== currentPlayer.getSymbol()) return false;
        if (array[4] !== currentPlayer.getSymbol()) return false;
        if (array[8] !== currentPlayer.getSymbol()) return false;
        return true;
      case 2:
      case 4:
      case 6:
        if (array[2] !== currentPlayer.getSymbol()) return false;
        if (array[4] !== currentPlayer.getSymbol()) return false;
        if (array[6] !== currentPlayer.getSymbol()) return false;
        return true;
    }
  }

  function isTie() {
    return numberOfRounds >= 9;
  }

  return {
    array,
    makeMove,
    makeRandomMove,
  };
})();

const displayControllerModule = (() => {
  const gridDimensions = 500;
  let array = [];
  let waitForAI = false;
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
    tile.style.backgroundColor = "grey";
    tile.style.width = `${tileSize}px`;
    tile.style.height = `${tileSize}px`;

    tile.addEventListener("click", function (e) {
      if (!waitForAI && gameBoardModule.makeMove(i)) {
        waitForAI = true;
        setTimeout(() => {
          gameBoardModule.makeRandomMove();
          waitForAI = false;
        }, 200);
      }
    });

    return tile;
  }

  function updateTile(i, currentPlayer) {
    const tile = array[i];
    tile.style.backgroundColor = currentPlayer.getColor();
    tile.innerText = currentPlayer.getSymbol();
  }

  return {
    updateTile,
  };
})();
