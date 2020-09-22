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

  const noWinningCombo = () => {

  	return true;
  }

  return { notOccupied, assignSymbol, display, noWinningCombo };
})();

const switchPlayer = () => {
	(currentPlayer === player1) ? (currentPlayer = player2) : (currentPlayer = player1);
}

const displayAlert = () => {
	const alertBox = document.getElementById('alert');
	alertBox.textContent = 'cell already occupied';

	const reset = () => {
		alertBox.textContent = " ";
	}

	setTimeout(reset, 1000);
}

const declareWinner = () => {

}



const gamePlay = (() => {
	const cell = document.getElementsByClassName('cell');
	const alertBox = document.getElementById('alert');

	let moves = 0

	for(let i=0; i<9; i++) {
		cell[i].addEventListener('click', () => {
			if(gameBoard.notOccupied(i)) {
				moves ++;
				gameBoard.assignSymbol(i);
				gameBoard.display();
				if(gameBoard.noWinningCombo()) { 
					switchPlayer() 
				} else { declareWinner() }
			} else {
				displayAlert();
			}
		})
	}
})(); 
