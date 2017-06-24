const logic = require('../src/js/pre-logic');
let mockState = {
  collision: false,
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
    direction: 'nope'
  },
  red: {
    x: 7,
    y: 10,
    direction: 'right'
  },
  orange: {
    x: 1,
    y: 8,
    direction: 'up'
  }
};

test('pacman state updates as expected', () => {
  let fakeState = {...mockState, pacman: { x: 5, y: 5, direction: 'right'}, red: {x: 9, y: 9, direction: 'right'}, orange: {x: 2, y: 2, direction: 'right'}};
  let expectedState = {...mockState, pacman: { x: 6, y: 5, direction: 'right'}, red: {x: 10, y: 9, direction: 'right'}, orange: {x: 3, y: 2, direction: 'right'}};
  expect(logic.crunchState(fakeState, {input: {pacman: 'right', red: 'nope', orange: 'nope'}})).toEqual(expectedState);
});

test('returns true if at edge', () => {
  expect(logic.isEdge({x: 5, y: 11, direction: logic.DOWN, rows: 12, cols: 12})).toBe(false);
  expect(logic.isEdge({x: 5, y: 11, direction: logic.UP, rows: 12, cols: 12})).toBe(true);
  expect(logic.isEdge({x: 0, y: 11, direction: logic.LEFT, rows: 12, cols: 12})).toBe(true);
  expect(logic.isEdge({x: 0, y: 11, direction: logic.RIGHT, rows: 12, cols: 12})).toBe(false);
  expect(logic.isEdge({x: 11, y: 11, direction: logic.RIGHT, rows: 12, cols: 12})).toBe(true);
  expect(logic.isEdge({x: 11, y: 11, direction: logic.LEFT, rows: 12, cols: 12})).toBe(false);
  expect(logic.isEdge({x: 5, y: 0, direction: logic.DOWN, rows: 12, cols: 12})).toBe(true);
  expect(logic.isEdge({x: 5, y: 0, direction: logic.UP, rows: 12, cols: 12})).toBe(false);
});

test('wall === wall', () => {
  expect(logic.isWall({walls: [], x: 0, y: 0})).toBe(false);
  expect(logic.isWall({walls: [{x: 0, y: 0}], x: 0, y: 0})).toBe(true);
  expect(logic.isWall({walls: [{x: 1, y: 0}, {x: 2, y: 0}], x: 0, y: 0})).toBe(false);
  expect(logic.isWall({walls: [{x: 1, y: 0}, {x: 2, y: 5}], x: 2, y: 5})).toBe(true);
  expect(logic.isWall({walls: [{x: 1, y: 0}, {x: 2, y: 5}], x: 0, y: 5})).toBe(false);
});

test('if collision is true expect input === ouput', () => {
  let fakeState = {...fakeState, collision: true, pacman: {x: 8, y: 10, direction: 'left'}, red: {x: 8, y: 10, direction: 'right'}};
  expect(logic.crunchState(fakeState, {input: {pacman: 'nope', red: 'nope', orange: 'nope'}})).toEqual(fakeState);
});

test('sprites on same square results in collision', () => {
  let fakeState = {...mockState, collision: false, pacman: {x: 9, y: 7, direction: 'left'}, red: {x: 7, y: 7, direction: 'right'}, orange: {x: 1, y: 7, direction: 'up'}};
  let collisionState = {...mockState, collision: true, pacman: {x: 8, y: 7, direction: 'left'}, red: {x: 8, y: 7, direction: 'right'}, orange: {x: 1, y: 6, direction: 'up'}};
  expect(logic.crunchState(fakeState, {input: {pacman: 'left', orange: 'nope', red: 'nope'}})).toEqual(collisionState);
});

test('ghosts can catch pacman', () => {
  let fakeState = {...fakeState, collision: false, pacman: {x: 8, y: 7, direction: 'nope', activeDirection: 'left'}, red: {x: 7, y: 7, direction: 'right'}, orange: {x: 1, y: 7, direction: 'up'}};
  expect(logic.collisionDetection(fakeState.red, fakeState.pacman)).toBe(true);
});

test('not every movement is a collision', () => {
  let fakeState = {...fakeState, collision: false, pacman: {x: 3, y: 7, direction: 'nope', activeDirection: 'left'}, red: {x: 7, y: 7, direction: 'right'}, orange: {x: 1, y: 7, direction: 'up'}};
  expect(logic.collisionDetection(fakeState.red, fakeState.pacman)).toBe(false);
});

test('it should wrap around edges', () => {
  expect(logic.wrapAroundBoard({rows: 12, cols: 12, x: 12, y: 12})).toEqual({x: 0, y: 0});
  expect(logic.wrapAroundBoard({rows: 12, cols: 12, x: -1, y: -1})).toEqual({x: 11, y: 11});
  expect(logic.wrapAroundBoard({rows: 12, cols: 12, x: 12, y: 5})).toEqual({x: 0, y: 5});
});

test('it should detect if the position is out of the board', () => {
  expect(logic.isInsideBoard({cols: 12, rows: 12, x: 1, y: 1})).toEqual(true);
  expect(logic.isInsideBoard({cols: 12, rows: 12, x: -1, y: 1})).toBe(false);
  expect(logic.isInsideBoard({cols: 12, rows: 12, x: -1, y: -1})).toBe(false);
  expect(logic.isInsideBoard({cols: 12, rows: 12, x: 1, y: -1})).toBe(false);
  expect(logic.isInsideBoard({cols: 12, rows: 12, x: 13, y: -1})).toBe(false);
  expect(logic.isInsideBoard({cols: 12, rows: 12, x: 13, y: 13})).toBe(false);
  expect(logic.isInsideBoard({cols: 12, rows: 12, x: 13, y: -1})).toBe(false);
});

test('it should test for a valid move', () => {
  expect(logic.isValidMove({direction: logic.UP, x: 0, y: 0, walls: [], rows: 12, cols: 12})).toBe(true);
  expect(logic.isValidMove({direction: logic.UP, x: 11, y: 10, walls: [{x: 11, y: 11}], rows: 12, cols: 12})).toBe(false);
  expect(logic.isValidMove({direction: logic.UP, x: 11, y: 11, walls: [], rows: 12, cols: 12})).toBe(true);
});