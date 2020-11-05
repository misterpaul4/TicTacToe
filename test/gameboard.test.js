import { gameBoard } from '../assets/app';

const {
  notOccupied, assignSymbol, noWinningCombo, checkDraw, reset,
} = gameBoard;

let board;

beforeEach(() => {
  board = [null, null, null, null, null, null, null, null, null];
});

describe('check if board is empty or not', () => {
  test('board is empty', () => {
    expect(notOccupied(0, board)).toBe(true);
  });

  test('board is occupied', () => {
    board[0] = 'X';
    expect(notOccupied(0, board)).toBe(false);
  });
});

describe('assign value to board', () => {
  beforeEach(() => {
    assignSymbol(0, 'X', 'red', board);
  });

  test('board with index 0 is X', () => {
    expect(board[0]).toBe('X');
  });

  test('board with index 0 is not O', () => {
    expect(board[0]).not.toBe('O');
  });
});

describe('#noWinningCombo', () => {
  test('there is no winner yet', () => {
    expect(noWinningCombo(board)).toBe(true);
  });

  test('Player X Wins with a row', () => {
    assignSymbol(0, 'X', 'red', board);
    assignSymbol(1, 'X', 'red', board);
    assignSymbol(2, 'X', 'red', board);

    expect(noWinningCombo(board)).toBe(false);
  });

  test('Player O Wins with a column', () => {
    assignSymbol(1, 'O', 'red', board);
    assignSymbol(4, 'O', 'red', board);
    assignSymbol(7, 'O', 'red', board);

    expect(noWinningCombo(board)).toBe(false);
  });

  test('Player O Wins with a diagonal', () => {
    assignSymbol(2, 'O', 'red', board);
    assignSymbol(4, 'O', 'red', board);
    assignSymbol(6, 'O', 'red', board);

    expect(noWinningCombo(board)).toBe(false);
  });
});

describe('#checkDraw', () => {
  beforeEach(() => {
    board = [
      null, 'O', 'X',
      'X', 'O', 'O',
      'O', 'X', 'X',
    ];
  });

  test('the board is not full so there is no draw', () => {
    expect(checkDraw(board)).toBe(false);
  });

  test('the board is full and there is a draw', () => {
    assignSymbol(0, 'O', 'red', board);
    expect(checkDraw(board)).toBe(true);
  });
});

describe('#reset', () => {
  const nonEmptyBoard = [
    null, 'O', 'X',
    'X', 'O', 'O',
    'O', 'X', null,
  ];

  const isEmpty = (board) => {
    let index = 0;
    while (index < board.length) {
      if (board[index]) {
        return false;
      }

      index += 1;
    }

    return true;
  };

  test('ressesting a board returns a null array', () => {
    reset(nonEmptyBoard);
    expect(isEmpty(nonEmptyBoard)).toBe(true);
  });
});
