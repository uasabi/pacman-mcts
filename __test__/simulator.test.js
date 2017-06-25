import * as logic from '../src/js/simulator';
import {UP, DOWN, LEFT, RIGHT} from '../src/js/gameLogic';

const mockState = {
  collision: false,
  lastRun: 0,
  board: {
    size: 144,
    rows: 12,
    cellSize: 4,
    walls: [
      {x: 0, y: 0},
      {x: 1, y: 0},
      {x: 2, y: 0},
      {x: 3, y: 0},
      {x: 8, y: 0},
      {x: 9, y: 0},
      {x: 10, y: 0},
      {x: 11, y: 0},
      {y: 0, x: 0},
      {y: 1, x: 0},
      {y: 2, x: 0},
      {y: 3, x: 0},
      {y: 8, x: 0},
      {y: 9, x: 0},
      {y: 10, x: 0},
      {y: 11, x: 0},
      {x: 0, y: 11},
      {x: 1, y: 11},
      {x: 2, y: 11},
      {x: 3, y: 11},
      {x: 8, y: 11},
      {x: 9, y: 11},
      {x: 10, y: 11},
      {x: 11, y: 11},
      {y: 0, x: 11},
      {y: 1, x: 11},
      {y: 2, x: 11},
      {y: 3, x: 11},
      {y: 8, x: 11},
      {y: 9, x: 11},
      {y: 10, x: 11},
      {y: 11, x: 11}
    ]
  },
  pacman: {
    x: 5,
    y: 5,
    direction: LEFT
  },
  red: {
    x: 7,
    y: 10,
    direction: RIGHT
  },
  orange: {
    x: 1,
    y: 8,
    direction: UP
  }
};

test('it should generate directions for pacman, red & orange', () => {
  expect(logic.computePossibleDirections({
    board: mockState.board,
    pacman: {x: 5, y: 5, direction: LEFT},
    red: {x: 10, y: 10, direction: RIGHT},
    orange: {x: 7, y: 11, direction: RIGHT},
  })).toEqual([
    [UP, DOWN, UP],
    [RIGHT, DOWN, UP],
    [DOWN, DOWN, UP],
    [LEFT, DOWN, UP],
  ]);
  expect(logic.computePossibleDirections({
    board: mockState.board,
    pacman: {x: 5, y: 5, direction: LEFT},
    red: {x: 7, y: 7, direction: RIGHT},
    orange: {x: 3, y: 3, direction: DOWN},
  })).toEqual([
    [UP, RIGHT, DOWN],
    [RIGHT, RIGHT, DOWN],
    [DOWN, RIGHT, DOWN],
    [LEFT, RIGHT, DOWN],
  ]);
  expect(logic.computePossibleDirections({
    board: mockState.board,
    pacman: {x: 10, y: 10, direction: LEFT},
    red: {x: 7, y: 7, direction: RIGHT},
    orange: {x: 3, y: 3, direction: DOWN},
  })).toEqual([
    [DOWN, RIGHT, DOWN],
    [LEFT, RIGHT, DOWN],
  ]);
});