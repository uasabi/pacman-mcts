const logic = require('../src/js/pre-logic.js');
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
  expect(logic.crunchState(fakeState, {input: 'right'})).toEqual(expectedState);
});

test('normal board piece is ok', () => {
  let expected = `
  <div
    id='01x04'
    style='box-sizing: border-box; display: inline-block; margin: 0; padding: 0; height: 3em; width: 3em; background-color: black;'
  >
  </div>`;
  expect(logic.makeBoardPiece('01x04', 3)).toEqual(expected);
});

test('wall piece is ok', () => {
  let expected = `
  <div
    id='11x01'
    style='box-sizing: border-box; display: inline-block; margin: 0; padding: 0; height: 3em; width: 3em; background-color: blue;'
  >
  </div>`;
  expect(logic.makeBoardPiece('11x01', 3, false)).toEqual(expected);
});

test('returns true if at edge', () => {
  expect(logic.isEdge('down', {x: 5, y: 11})).toBe(true);
});

test('wall === wall', () => {
  let checkIfWall = logic.checkWall(fakeState);
  expect(checkIfWall(fakeState.pacman)).toBe(false);
});

test('state crunches', () => {
  let expectedState = {...fakeState, red: {x: 8, y: 10, direction: 'right'}, orange: {x: 1, y: 7, direction: 'up'}};
  expect(logic.crunchState(fakeState, {input: 'nope'})).toEqual(expectedState);
});

test('detects when there\s a collision', () => {
  let fakeState = {...fakeState, pacman: {x: 8, y: 10, direction: 'left'}, red: {x: 8, y: 10, direction: 'right'}};
  expect(logic.collisionDetection(fakeState.pacman, fakeState.red)).toBe(true);
});

test('if collision is true expect input === ouput', () => {
  let fakeState = {...fakeState, collision: true, pacman: {x: 8, y: 10, direction: 'left'}, red: {x: 8, y: 10, direction: 'right'}};
  expect(logic.crunchState(fakeState, {input: 'nope'})).toEqual(fakeState);
});

test('sprites on same square results in collision', () => {
  let fakeState = {...fakeState, collision: false, pacman: {x: 9, y: 7, direction: 'left'}, red: {x: 7, y: 7, direction: 'right'}, orange: {x: 1, y: 7, direction: 'up'}};
  let collisionState = {...fakeState, collision: true, pacman: {x: 8, y: 7, direction: 'left'}, red: {x: 8, y: 7, direction: 'right'}, orange: {x: 1, y: 6, direction: 'up'}};
  expect(logic.crunchState(fakeState, {input: 'left'})).toEqual(collisionState);
});

test('ghosts can catch pacman', () => {
  let fakeState = {...fakeState, collision: false, pacman: {x: 8, y: 7, direction: 'nope', activeDirection: 'left'}, red: {x: 7, y: 7, direction: 'right'}, orange: {x: 1, y: 7, direction: 'up'}};
  expect(logic.collisionDetection(fakeState.red, fakeState.pacman)).toBe(true);
});

test('not every movement is a collision', () => {
  let fakeState = {...fakeState, collision: false, pacman: {x: 3, y: 7, direction: 'nope', activeDirection: 'left'}, red: {x: 7, y: 7, direction: 'right'}, orange: {x: 1, y: 7, direction: 'up'}};
  expect(logic.collisionDetection(fakeState.red, fakeState.pacman)).toBe(false);
});
