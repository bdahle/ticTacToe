// single: module
// gameBoard
const gameBoardModule = (() => {
  let array = [];
  return {
    array,
  };
})();

// displayController
const displayControllerModule = (() => {
  const gridDimensions = 500;
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
    }
  }

  function makeTile(tileSize, i) {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    tile.setAttribute("data-index", i);
    tile.innerText = "X";
    tile.style.backgroundColor = "cyan";
    tile.style.width = `${tileSize}px`;
    tile.style.height = `${tileSize}px`;
    return tile;
  }
})();

// multiple: factory
// player
const playerFactory = (name, symbol) => {
  const getName = () => name;
  const getSymbol = () => symbol;
  return { getName, getSymbol };
};

const playerOne = playerFactory("Player One", "X");
const playerTwo = playerFactory("Player Two", "O");
