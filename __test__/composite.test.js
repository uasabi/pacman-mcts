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

test('state crunches', () => {
  let expectedState = {...fakeState, red: {x: 8, y: 10, direction: 'right'}, orange: {x: 1, y: 7, direction: 'up'}};
  expect(logic.crunchState(fakeState, {input: {pacman: 'nope', orange: 'nope', red: 'nope'}})).toEqual(expectedState);
});

test('detects when there\s a collision', () => {
  let fakeState = {...fakeState, pacman: {x: 8, y: 10, direction: 'left'}, red: {x: 8, y: 10, direction: 'right'}};
  expect(logic.collisionDetection(fakeState.pacman, fakeState.red)).toBe(true);
});

test('create unique possible sets of directions', () => {
  let expected = logic.directionGen();
  if (expected[1] !== expected[2]) {
    expect(expected[0]).not.toEqual(expected[1]||expected[2]);
  } else {
    expect(expected[1]).not.toEqual(expected[2]);
  }
});

test('use the directions to generate states', () => {
  fakeState = {
    pacman: {
      x: 5,
      y: 6,
      direction: 'nope',
      activeDirection: 'up'
    },
    orange: {
      x: 3,
      y: 4,
      direction: 'right'
    },
    red: {
      x: 3,
      y: 9,
      direction: 'left'
    }
  };
  let expected = logic.stateGen(fakeState);
  expect(expected).toHaveLength(3);
});

test('generate an object with states as values', () => {
  let stateArr = [ { pacman: { x: 5, y: 7, direction: 'nope', activeDirection: 'up' },
    orange: { x: 3, y: 3, direction: 'right' },
    red: { x: 4, y: 9, direction: 'left' } },
  { pacman: { x: 4, y: 6, direction: 'nope', activeDirection: 'up' },
    orange: { x: 3, y: 3, direction: 'right' },
    red: { x: 4, y: 9, direction: 'left' } },
  { pacman: { x: 5, y: 7, direction: 'nope', activeDirection: 'up' },
    orange: { x: 3, y: 3, direction: 'right' },
    red: { x: 2, y: 9, direction: 'left' } } ];
  let expected = logic.createTree(stateArr);
  expect(expected[0].state).toMatchObject(stateArr[0]);
});

test('generate tree with first layer as states and next layer as newly generated states', () => {
  let stateArr = [ { pacman: { x: 5, y: 7, direction: 'nope', activeDirection: 'up' },
    orange: { x: 3, y: 3, direction: 'right' },
    red: { x: 4, y: 9, direction: 'left' } },
  { pacman: { x: 4, y: 6, direction: 'nope', activeDirection: 'up' },
    orange: { x: 3, y: 3, direction: 'right' },
    red: { x: 4, y: 9, direction: 'left' } },
  { pacman: { x: 5, y: 7, direction: 'nope', activeDirection: 'up' },
    orange: { x: 3, y: 3, direction: 'right' },
    red: { x: 2, y: 9, direction: 'left' } } ];
  let expected = logic.createTree(stateArr);
  let firstLayer = Object.keys(expected);
  let nextLayer = Object.keys(expected[firstLayer[0]]);
  expect(firstLayer.length).toEqual(nextLayer.length - 1);
});

test('deepen tree created to number of layers "n"', () => {
  let tree = {
    '0': {
      '0': { state:
        { pacman: { x: 5, y: 4, direction: 'nope', activeDirection: 'up' }, orange: { x: 4, y: 5, direction: 'right' }, red: { x: 3, y: 9, direction: 'left' } } },
      '1': { state:
        { pacman: { x: 5, y: 6, direction: 'nope', activeDirection: 'up' }, orange: { x: 4, y: 5, direction: 'right' }, red: { x: 4, y: 8, direction: 'left' } } },
      '2': { state:
        { pacman: { x: 5, y: 4, direction: 'nope', activeDirection: 'up' }, orange: { x: 2, y: 5, direction: 'right' }, red: { x: 4, y: 10, direction: 'left' } } },
      state: { pacman: { x: 5, y: 5, direction: 'nope', activeDirection: 'up' }, orange: { x: 4, y: 4, direction: 'right' }, red: { x: 3, y: 10, direction: 'left' } } },
    '1': {
      '0': { state:
        { pacman: { x: 5, y: 6, direction: 'nope', activeDirection: 'up' }, orange: { x: 4, y: 3, direction: 'right' }, red: { x: 1, y: 9, direction: 'left' } } },
      '1': { state:
        { pacman: { x: 4, y: 5, direction: 'nope', activeDirection: 'up' }, orange: { x: 5, y: 4, direction: 'right' }, red: { x: 2, y: 10, direction: 'left' } } },
      '2': { state:
        { pacman: { x: 5, y: 4, direction: 'nope', activeDirection: 'up' }, orange: { x: 3, y: 4, direction: 'right' }, red: { x: 3, y: 9, direction: 'left' } } },
      state: { pacman: { x: 5, y: 5, direction: 'nope', activeDirection: 'up' }, orange: { x: 4, y: 4, direction: 'right' }, red: { x: 2, y: 9, direction: 'left' } } },
    '2': {
      '0': { state:
        { pacman: { x: 5, y: 6, direction: 'nope', activeDirection: 'up' }, orange: { x: 3, y: 4, direction: 'right' }, red: { x: 5, y: 9, direction: 'left' } } },
      '1': { state:
        { pacman: { x: 6, y: 7, direction: 'nope', activeDirection: 'up' }, orange: { x: 3, y: 2, direction: 'right' }, red: { x: 3, y: 9, direction: 'left' } } },
      '2': { state: { pacman: { x: 5, y: 8, direction: 'nope', activeDirection: 'up' }, orange: { x: 2, y: 3, direction: 'right' }, red: { x: 4, y: 8, direction: 'left' } } },
      state: { pacman: { x: 5, y: 7, direction: 'nope', activeDirection: 'up' }, orange: { x: 3, y: 3, direction: 'right' }, red: { x: 4, y: 9, direction: 'left' } } }
  };
  let n = 4;
  let expected = logic.deepenTree(tree, n);
  let numOfLayers = logic.recursiveKeys(tree);
  let missingLayers = n - numOfLayers;
  let newLayers = logic.recursiveKeys(expected);
  expect(expected).toEqual(numOfLayers + missingLayers);
});
