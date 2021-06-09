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

  function updateArray(i) {
    let playerSymbol = playerOneNext
      ? playerOne.getSymbol()
      : playerTwo.getSymbol();
    playerOneNext = !playerOneNext;
    array[i] = playerSymbol;
    // if (playerOneNext) {
    //   array[i] = "X";
    //   playerOneNext = false;
    // } else {
    //   array[i] = "O";
    //   playerOneNext = true;
    // }

    console.log(array);
    displayControllerModule.updateTile(i, playerSymbol);
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
      // this.style.backgroundColor = "red";
      // tile.innerText = playerOne.getSymbol();
      // updateTile(i);

      gameBoardModule.updateArray(e.target.dataset.index);
    });

    return tile;
  }

  function updateTile(i, playerSymbol) {
    const tile = array[i];
    tile.style.backgroundColor = "red";
    tile.innerText = playerSymbol;
  }

  return {
    updateTile,
  };
})();
