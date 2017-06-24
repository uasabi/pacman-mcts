const logic = require('../src/js/pre-logic');
let fakeState = {
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
  let fakeState = {...fakeState, pacman: { x: 5, y: 5, direction: 'right'}, red: {x: 9, y: 9, direction: 'right'}, orange: {x: 2, y: 2, direction: 'right'}};
  let expectedState = {...fakeState, pacman: { x: 6, y: 5, direction: 'right'}, red: {x: 10, y: 9, direction: 'right'}, orange: {x: 3, y: 2, direction: 'right'}};
  expect(logic.crunchState(fakeState, {input: {pacman: 'right', red: 'nope', orange: 'nope'}})).toEqual(expectedState);
});

test('returns true if at edge', () => {
  expect(logic.isEdge('down', {x: 5, y: 11})).toBe(true);
});

test('wall === wall', () => {
  let checkIfWall = logic.checkWall(fakeState);
  expect(checkIfWall(fakeState.pacman)).toBe(false);
});

test('if collision is true expect input === ouput', () => {
  let fakeState = {...fakeState, collision: true, pacman: {x: 8, y: 10, direction: 'left'}, red: {x: 8, y: 10, direction: 'right'}};
  expect(logic.crunchState(fakeState, {input: {pacman: 'nope', red: 'nope', orange: 'nope'}})).toEqual(fakeState);
});

test('sprites on same square results in collision', () => {
  let fakeState = {...fakeState, collision: false, pacman: {x: 9, y: 7, direction: 'left'}, red: {x: 7, y: 7, direction: 'right'}, orange: {x: 1, y: 7, direction: 'up'}};
  let collisionState = {...fakeState, collision: true, pacman: {x: 8, y: 7, direction: 'left'}, red: {x: 8, y: 7, direction: 'right'}, orange: {x: 1, y: 6, direction: 'up'}};
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
