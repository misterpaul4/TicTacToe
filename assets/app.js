const Player = (name, symbol) => {
	const getName = () => { return name };
	const getSymbol = () => { return symbol };
	return { getName, getSymbol };
}

const player1 = Player('john', 'X');
const player2 = Player('peter', 'O');
const alertBox = document.getElementById('alert');

let currentPlayer = player1;


const gameBoard = (() => {
	const cell = document.getElementsByClassName('cell');
  let board = [null,null,null,null,null,null,null,null,null];

  const winX = 'XXX';
  const winO = 'OOO';

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
  	// horizontal
  	if((board[0] + board[1] + board[2]) === winX  ||  (board[0] + board[1] + board[2]) === winO) { 
  		return false;
  	} else if ((board[3] + board[4] + board[5]) === winX  ||  (board[3] + board[4] + board[5]) === winO) {
  			return false;
  	} else if ((board[6] + board[7] + board[8]) === winX  ||  (board[6] + board[7] + board[8]) === winO) {
  			return false;
  	}

  	// vertical
  	else if ((board[0] + board[3] + board[6]) === winX  ||  (board[0] + board[3] + board[6]) === winO) {
  		return false;
  	} else if ((board[1] + board[4] + board[7]) === winX  ||  (board[1] + board[4] + board[7]) === winO) {
  		return false;
  	} else if ((board[2] + board[5] + board[8]) === winX  ||  (board[2] + board[5] + board[8]) === winO) {
  		return false;
  	}

  	// diagonal
  	else if ((board[0] + board[4] + board[8]) === winX  ||  (board[0] + board[4] + board[8]) === winO) {
  		return false;
  	} else if ((board[2] + board[4] + board[6]) === winX  ||  (board[2] + board[4] + board[6]) === winO) {
  		return false;
  	}


  	return true;
  }

  const checkDraw = () => {
  	for (let i=0; i<9; i+=3) {
  		if (!board[i] || !board[i+1] || !board[i+2]) { 
  			return false;
  		}
  	}

  	return true;
  }

  return { checkDraw, notOccupied, assignSymbol, display, noWinningCombo };
})();

const switchPlayer = () => {
	(currentPlayer === player1) ? (currentPlayer = player2) : (currentPlayer = player1);
}

const displayAlert = () => {
	alertBox.textContent = 'cell already occupied';

	const reset = () => {
		alertBox.textContent = " ";
	}

	setTimeout(reset, 1000);
}

const declareWinner = () => {
	alertBox.textContent = `${currentPlayer.getName()} WINS!`
}

const declareTie = () => {
	alertBox.textContent = 'GameOver, game was a tie';
}

const gamePlay = (() => {
	const cell = document.getElementsByClassName('cell');

	let moves = 0

	for(let i=0; i<9; i++) {
		cell[i].addEventListener('click', () => {
			if(gameBoard.notOccupied(i)) {
				moves ++;
				gameBoard.assignSymbol(i);
				gameBoard.display();
				if(gameBoard.noWinningCombo()) {
					if (gameBoard.checkDraw()) {
						declareTie();
					}
					switchPlayer() 
				} else { declareWinner() }
			} else {
				displayAlert();
			}
		})
	}
})(); 
