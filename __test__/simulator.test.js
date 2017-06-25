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

test('it should generate a tree of states', () => {
  const rootState = {
    collision: false,
    board: {
      rows: 12,
      walls: []
    },
    pacman: {x: 10, y: 10, direction: LEFT},
    red: {x: 7, y: 7, direction: RIGHT},
    orange: {x: 3, y: 3, direction: DOWN},
  };
  const tree = logic.generateTree({rootState, nestingLevel: 2});
  expect(tree.level).toBe(0);
  expect(tree.parent).toBe(null);
  expect(tree.children.length).toEqual(4);
  tree.children.forEach(child => {
    expect(child.level).toEqual(1);
    expect(child.parent).toBe(rootState);
    expect(child.children.length).toEqual(4);
    child.children.forEach(it => {
      expect(it.children.length).toEqual(0);
      expect(it.level).toEqual(2);
      expect(it.parent).toEqual(child.state);
    });
  });
  expect(tree.children[0].state.pacman).toEqual({x: 10, y: 11, direction: UP});
  expect(tree.children[0].state.red).toEqual({x: 8, y: 7, direction: RIGHT});
  expect(tree.children[0].state.orange).toEqual({x: 3, y: 2, direction: DOWN});
  expect(tree.children[1].state.pacman).toEqual({x: 11, y: 10, direction: RIGHT});
  expect(tree.children[1].state.red).toEqual({x: 8, y: 7, direction: RIGHT});
  expect(tree.children[1].state.orange).toEqual({x: 3, y: 2, direction: DOWN});
  expect(tree.children[2].state.pacman).toEqual({x: 10, y: 9, direction: DOWN});
  expect(tree.children[2].state.red).toEqual({x: 8, y: 7, direction: RIGHT});
  expect(tree.children[2].state.orange).toEqual({x: 3, y: 2, direction: DOWN});
  expect(tree.children[3].state.pacman).toEqual({x: 9, y: 10, direction: LEFT});
  expect(tree.children[3].state.red).toEqual({x: 8, y: 7, direction: RIGHT});
  expect(tree.children[3].state.orange).toEqual({x: 3, y: 2, direction: DOWN});
});