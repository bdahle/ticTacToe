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
      gameOver = isGameOver();
      console.log(gameOver);
    }
  }

  function indexIsEmpty(i) {
    return typeof array[i] === "undefined";
  }

  function isGameOver() {
    return moveIsWinning() || isTie();
  }

  function moveIsWinning() {}

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
      gameBoardModule.updateArray(e.target.dataset.index);
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
