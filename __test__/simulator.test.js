import * as logic from '../src/js/simulator';
import {UP, DOWN, LEFT, RIGHT} from '../src/js/gameLogic';

const mockState = {
  collision: false,
  lastRun: 0,
  pills: [],
  board: {
    rows: 12,
    cols: 12,
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
    pacman: {x: 5, y: 5, direction: LEFT, score: 0},
    red: {x: 10, y: 10, direction: RIGHT, score: 0},
    orange: {x: 7, y: 11, direction: RIGHT, score: 0},
  })).toEqual([
    {pacman: UP, red: DOWN, orange: UP},
    {pacman: RIGHT, red: DOWN, orange: UP},
    {pacman: DOWN, red: DOWN, orange: UP},
    {pacman: LEFT, red: DOWN, orange: UP},
  ]);
  expect(logic.computePossibleDirections({
    board: mockState.board,
    pacman: {x: 5, y: 5, direction: LEFT, score: 0},
    red: {x: 7, y: 7, direction: RIGHT, score: 0},
    orange: {x: 3, y: 3, direction: DOWN, score: 0},
  })).toEqual([
    {pacman: UP, red: RIGHT, orange: DOWN},
    {pacman: RIGHT, red: RIGHT, orange: DOWN},
    {pacman: DOWN, red: RIGHT, orange: DOWN},
    {pacman: LEFT, red: RIGHT, orange: DOWN},
  ]);
  expect(logic.computePossibleDirections({
    board: mockState.board,
    pacman: {x: 10, y: 10, direction: LEFT, score: 0},
    red: {x: 7, y: 7, direction: RIGHT, score: 0},
    orange: {x: 3, y: 3, direction: DOWN, score: 0},
  })).toEqual([
    {pacman: DOWN, red: RIGHT, orange: DOWN},
    {pacman: LEFT, red: RIGHT, orange: DOWN},
  ]);
  expect(logic.computePossibleDirections({
    board: mockState.board,
    pacman: {x: 10, y: 10, direction: LEFT, score: 0},
    red: {x: 7, y: 7, direction: RIGHT, score: 0},
  })).toEqual([
    {pacman: DOWN, red: RIGHT, orange: null},
    {pacman: LEFT, red: RIGHT, orange: null},
  ]);
});

test('it should generate a tree of states', () => {
  const rootState = {
    collision: false,
    pills: [],
    board: {
      rows: 12,
      walls: []
    },
    pacman: {x: 10, y: 10, direction: LEFT, score: 0},
    red: {x: 7, y: 7, direction: RIGHT, score: 0},
    orange: {x: 3, y: 3, direction: DOWN, score: 0},
  };
  const tree = logic.generateTree({rootState, nestingLevel: 2});
  expect(tree.level).toBe(0);
  expect(tree.parent).toBe(null);
  expect(tree.children.length).toEqual(4);
  tree.children.forEach(child => {
    expect(child.level).toEqual(1);
    expect(child.parent.state).toBe(rootState);
    expect(child.children.length).toEqual(4);
    child.children.forEach(it => {
      expect(it.children.length).toEqual(0);
      expect(it.level).toEqual(2);
      expect(it.parent.state).toEqual(child.state);
    });
  });
  expect(tree.children[0].state.pacman).toEqual({x: 10, y: 11, direction: UP, score: 0});
  expect(tree.children[0].state.red).toEqual({x: 8, y: 7, direction: RIGHT, score: 0});
  expect(tree.children[0].state.orange).toEqual({x: 3, y: 2, direction: DOWN, score: 0});
  expect(tree.children[1].state.pacman).toEqual({x: 11, y: 10, direction: RIGHT, score: 0});
  expect(tree.children[1].state.red).toEqual({x: 8, y: 7, direction: RIGHT, score: 0});
  expect(tree.children[1].state.orange).toEqual({x: 3, y: 2, direction: DOWN, score: 0});
  expect(tree.children[2].state.pacman).toEqual({x: 10, y: 9, direction: DOWN, score: 0});
  expect(tree.children[2].state.red).toEqual({x: 8, y: 7, direction: RIGHT, score: 0});
  expect(tree.children[2].state.orange).toEqual({x: 3, y: 2, direction: DOWN, score: 0});
  expect(tree.children[3].state.pacman).toEqual({x: 9, y: 10, direction: LEFT, score: 0});
  expect(tree.children[3].state.red).toEqual({x: 8, y: 7, direction: RIGHT, score: 0});
  expect(tree.children[3].state.orange).toEqual({x: 3, y: 2, direction: DOWN, score: 0});
});

test('it should generate a Monte Carlo tree of states', () => {
  const rootState = {
    collision: false,
    pills: [{x: 11, y: 10}, {x: 10, y: 11}, {x: 8, y: 10}],
    board: {
      rows: 12,
      walls: []
    },
    pacman: {x: 10, y: 10, direction: LEFT, score: 10},
    red: {x: 7, y: 7, direction: RIGHT, score: 1},
    orange: {x: 3, y: 3, direction: DOWN, score: 1},
  };
  const treeWith0Levels = logic.generateMCTree({rootState, nestingLevel: 0});
  expect(treeWith0Levels.accumulatedPacmanScore).toEqual(10);
  expect(treeWith0Levels.accumulatedRedScore).toEqual(1);
  expect(treeWith0Levels.accumulatedOrangeScore).toEqual(1);

  const treeWith1Level = logic.generateMCTree({rootState, nestingLevel: 1});
  expect(treeWith1Level.accumulatedPacmanScore).toEqual(42);
  expect(treeWith1Level.accumulatedRedScore).toEqual(4);
  expect(treeWith1Level.accumulatedOrangeScore).toEqual(4);

  const treeWith2Level = logic.generateMCTree({rootState, nestingLevel: 2});
  expect(treeWith2Level.accumulatedPacmanScore).toEqual(169);
  expect(treeWith2Level.accumulatedRedScore).toEqual(16);
  expect(treeWith2Level.accumulatedOrangeScore).toEqual(16);
});

test('it should pick the best move #1', () => {
  const rootState = {
    collision: false,
    pills: [{x: 11, y: 10}],
    board: {
      rows: 12,
      cols: 12,
      walls: []
    },
    pacman: {x: 10, y: 10, direction: LEFT, score: 10},
    red: {x: 7, y: 7, direction: RIGHT, score: 1},
    orange: {x: 3, y: 3, direction: DOWN, score: 1},
  };
  expect(logic.pickNextMove(rootState)).toEqual(RIGHT);
});

test.only('it should pick the best move #2', () => {
  const rootState = {
    collision: false,
    pills: [
      {x: 1, y: 1},
      {x: 2, y: 1},
      {x: 1, y: 2},
      {x: 2, y: 2},
      {x: 2, y: 3}
    ],
    board: {
      rows: 12,
      cols: 12,
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
    pacman: {x: 2, y: 4, direction: RIGHT, score: 14},
    red: {x: 7, y: 1, direction: UP, score: 0},
    orange: {x: 10, y: 7, direction: UP, score: 0},
  };
  expect(logic.pickNextMove(rootState, 1)).toEqual(DOWN);
  expect(logic.pickNextMove(rootState, 2)).toEqual(DOWN);
  expect(logic.pickNextMove(rootState, 3)).toEqual(DOWN);
  // expect(logic.pickNextMove(rootState, 4)).toEqual(DOWN);
  // expect(logic.pickNextMove(rootState, 5)).toEqual(DOWN);
});