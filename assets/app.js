const gameBoard = (() => {
	const cell = document.getElementsByClassName('cell');
  let board = [null,null,null,null,null,null,null,null,null];

  const display = () => {
  	for(let i=0; i<9; i++) {
  		cell[i].textContent = board[i];
  	}
  }

  const notOccupied = (index) => {
  	if(board[index] === null) {return true}

  	return false;
  }

  return { display, notOccupied };
})();

const Player = (name, symbol) => {
	const getName = () => { return name };
	const getSymbol = () => { return symbol };
	return { getName, getSymbol };
}

const displayAlert = () => {
	const alertBox = document.getElementById('alert');
	alertBox.textContent = 'cell already occupied'
}

const gamePlay = (() => {
	const cell = document.getElementsByClassName('cell');
	for(let i=0; i<9; i++) {
		cell[i].addEventListener('click', () => {
			if(gameBoard.notOccupied(i)) {
				console.log("yes")
			} else {
				displayAlert()
			}
		})
	}
})(); 

// gamePlay

// gameBoard.display()
