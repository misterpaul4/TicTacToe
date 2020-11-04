import { gameBoard } from '../assets/app';

let board;

beforeEach(() => {
  board = [null, null, null, null, null, null, null, null, null];
});

describe('check if board is empty or not', () => {
	test('board is empty', () => {
		expect(gameBoard.notOccupied(0, board)).toBe(true);
	});

	test('board is occupied', () => {
		board[0] = 'X';
		expect(gameBoard.notOccupied(0, board)).toBe(false);
	});
});

describe('assign value to board', () => {
	beforeEach(() => {
		gameBoard.assignSymbol(0, 'X', 'red', board);
	});

	test('board with index 0 is X', () => {
		expect(board[0]).toBe('X');
	});

	test('board with index 0 is not O', () => {
		expect(board[0]).not.toBe('O');
	});
});
