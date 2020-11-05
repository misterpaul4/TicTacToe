import { Player } from '../assets/app';

const p1 = Player('josh', 'X', 'red', 0);

test('get the player name', () => {
  expect(p1.getName()).toBe('josh');
});

test('get the player symbol', () => {
  expect(p1.getSymbol()).toBe('X');
});

test('get the player color', () => {
  expect(p1.getColor()).toBe('red');
});

test('get the player score', () => {
  expect(p1.score).toBe(0);
});