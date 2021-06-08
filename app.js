// single: module
// gameBoard
const gameBoardModule = (() => {
  let array = [];
  return {
    array,
  };
})();

// displayController
const displayControllerModule = (() => {})();

// multiple: factory
// player
const playerFactory = (name, symbol) => {
  const getName = () => name;
  const getSymbol = () => symbol;
  return { getName, getSymbol };
};

const playerOne = playerFactory("Player One", "X");
const playerTwo = playerFactory("Player Two", "O");
