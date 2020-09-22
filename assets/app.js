const gameBoard = (() => {
  let board = [1,2,3,4,5,6,7,8,9];

  return { board }
})();

const Player = (name, symbol) => {
	const getName = () => { return name };
	const getSymbol = () => { return symbol };
	return { getName, getSymbol };
}

const displayBoard = () => {
	const cell = document.getElementsByClassName('cell');

	for(let i=0; i<9; i++) {
		cell[i].textContent = gameBoard.board[i];
	}
}

displayBoard()


// const gamePlay = (() => {
// 	for(let i=0; i<9; i++) {
// 		cells[i].addEventListener('click', () => {
// 			
// 		})
// 	}
// })(); 

// gamePlay