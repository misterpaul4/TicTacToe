const Player = (name, symbol) => {
	const getName = () => { return name };
	const getSymbol = () => { return symbol };
	return { getName, getSymbol };
}

const player1 = Player('john', 'X');
const player2 = Player('peter', 'O');
let currentPlayer = player1;


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

  const assignSymbol = (index) => {
  	board[index] = currentPlayer.getSymbol();
  }

  return { notOccupied, assignSymbol, display };
})();

const switchPlayer = () => {
	(currentPlayer === player1) ? (currentPlayer = player2) : (currentPlayer = player1);
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
				gameBoard.assignSymbol(i);
				gameBoard.display();
				switchPlayer();
			} else {
				displayAlert()
			}
		})
	}
})(); 


