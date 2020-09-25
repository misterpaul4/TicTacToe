/* eslint-disable no-loop-func */
/* eslint-disable no-empty */
const Player = (name, symbol, color, score) => {
  const getName = () => name;
  const getSymbol = () => symbol;
  const getColor = () => color;
  return { getName, getSymbol, getColor, score };
};

const alertBox = document.getElementById('alert');

const gameBoard = (() => {
  const cell = document.getElementsByClassName('cell');
  let board = [null, null, null, null, null, null, null, null, null];

  const winX = 'XXX';
  const winO = 'OOO';

  const display = () => { for (let i = 0; i < 9; i += 1) { cell[i].textContent = board[i]; } };

  const notOccupied = (index) => {
    if (board[index] === null) { return true; }

    return false;
  };

  const assignSymbol = (index, symbol, color) => {
    board[index] = symbol;
    cell[index].style.color = color;
  };

  const noWinningCombo = () => {
    // horizontal
    if ((board[0] + board[1] + board[2]) === winX || (board[0] + board[1] + board[2]) === winO) {
      return false;
    } if ((board[3] + board[4] + board[5]) === winX || (board[3] + board[4] + board[5]) === winO) {
      return false;
    } if ((board[6] + board[7] + board[8]) === winX || (board[6] + board[7] + board[8]) === winO) {
      return false;
    }

    // vertical
    if ((board[0] + board[3] + board[6]) === winX || (board[0] + board[3] + board[6]) === winO) {
      return false;
    } if ((board[1] + board[4] + board[7]) === winX || (board[1] + board[4] + board[7]) === winO) {
      return false;
    } if ((board[2] + board[5] + board[8]) === winX || (board[2] + board[5] + board[8]) === winO) {
      return false;
    }

    // diagonal
    if ((board[0] + board[4] + board[8]) === winX || (board[0] + board[4] + board[8]) === winO) {
      return false;
    } if ((board[2] + board[4] + board[6]) === winX || (board[2] + board[4] + board[6]) === winO) {
      return false;
    }


    return true;
  };

  const checkDraw = () => {
    for (let i = 0; i < 9; i += 3) {
      if (!board[i] || !board[i + 1] || !board[i + 2]) {
        return false;
      }
    }

    return true;
  };

  const reset = () => {
    board = [null, null, null, null, null, null, null, null, null];
    alertBox.textContent = '';
    display();
  };

  return { reset, checkDraw, notOccupied, assignSymbol, display, noWinningCombo };
})();

const displayAlert = () => {
  alertBox.textContent = 'cell already occupied';

  const reset = () => {
    alertBox.textContent = ' ';
  };

  setTimeout(reset, 1000);
};

// eslint-disable-next-line no-unused-vars
const gamePlay = (() => {
  const cell = document.getElementsByClassName('cell');
  const player1Input = document.getElementById('player_1');
  const player2Input = document.getElementById('player_2');
  const formBtn = document.getElementById('form-btn');
  const formContainer = document.getElementsByClassName('form-container')[0];
  const playerField1 = document.getElementsByClassName('player-name')[0];
  const playerField2 = document.getElementsByClassName('player-name')[1];
  const restartBtn = document.getElementById('restart-btn');
  const indicator1 = document.getElementsByClassName('indicator')[0];
  const indicator2 = document.getElementsByClassName('indicator')[1];
  const score1 = document.getElementsByClassName('score')[0];
  const score2 = document.getElementsByClassName('score')[1];
  const quitBtn = document.getElementById('quit-btn');
  const hideForm = () => {
    formContainer.style.display = 'none';
  };
  let gameOver = false;

  let currentPlayer;
  let player1;
  let player2;

  const restartAction = () => {
    restartBtn.style.background = 'darkorange';
    restartBtn.textContent = 'RESTART';
  };

  const continueAction = () => {
    restartBtn.style.background = 'green';
    restartBtn.textContent = 'CONTINUE';
  };

  const switchPlayer = () => {
    if (currentPlayer === player1) {
      currentPlayer = player2;
      indicator1.style.visibility = 'hidden';
      indicator2.style.visibility = 'visible';
    } else {
      currentPlayer = player1;
      indicator1.style.visibility = 'visible';
      indicator2.style.visibility = 'hidden';
    }
  };

  formBtn.addEventListener('click', (e) => {
    e.preventDefault();
    player1 = Player(player1Input.value, 'X', 'green', 0);
    player2 = Player(player2Input.value, 'O', 'red', 0);
    currentPlayer = player1;
    setTimeout(hideForm, 300);
    playerField1.textContent = `${player1.getName()} (${player1.getSymbol()})`;
    playerField2.textContent = `${player2.getName()} (${player2.getSymbol()})`;
    indicator2.style.visibility = 'hidden';
    score1.textContent = 0;
    score2.textContent = 0;
  });

  restartBtn.addEventListener('click', () => {
    gameBoard.reset();
    gameOver = false;
    restartAction();
  });

  quitBtn.addEventListener('click', () => {
    formContainer.style.display = 'flex';
  });

  const declareWinner = () => {
    alertBox.textContent = `${currentPlayer.getName()} WINS!`;
    currentPlayer.score += 1;
    score1.textContent = player1.score;
    score2.textContent = player2.score;
    gameOver = true;
    continueAction();
  };

  const declareTie = () => {
    alertBox.textContent = 'GameOver, game was a tie';
    gameOver = true;
    continueAction();
  };

  const cellClickable = () => {
    for (let i = 0; i < 9; i += 1) {
      cell[i].addEventListener('click', () => {
        if (gameOver) { } else if (gameBoard.notOccupied(i)) {
          // moves ++;
          gameBoard.assignSymbol(i, currentPlayer.getSymbol(), currentPlayer.getColor());
          gameBoard.display();
          if (gameBoard.noWinningCombo()) {
            if (gameBoard.checkDraw()) {
              declareTie();
            }
            switchPlayer();
          } else {
            declareWinner();
          }
        } else {
          displayAlert();
        }
      });
    }
  };

  cellClickable();
})();
