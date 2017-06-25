import * as logic from '../src/js/gameLogic';

const mockState = {
  collision: false,
  lastRun: 0,
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
  pacman: {x: 5, y: 5, direction: logic.RIGHT},
  red: {x: 7, y: 10, direction: logic.RIGHT},
  orange: {x: 1, y: 8, direction: logic.UP}
};

test('state updates as expected', () => {
  expect(logic.computeNextState({
    board: mockState.board,
    pacman: {x: 5, y: 5, direction: logic.RIGHT},
    red: {x: 7, y: 10, direction: logic.RIGHT},
    orange: {x: 1, y: 8, direction: logic.UP}
  }, {input: {pacman: logic.RIGHT, red: logic.NONE, orange: logic.NONE}})).toEqual({
    collision: false,
    board: mockState.board,
    pacman: {x: 6, y: 5, direction: logic.RIGHT},
    red: {x: 8, y: 10, direction: logic.RIGHT},
    orange: {x: 1, y: 9, direction: logic.UP},
  });
  expect(logic.computeNextState({
    board: mockState.board,
    pacman: {x: 5, y: 5, direction: logic.RIGHT},
    red: {x: 10, y: 10, direction: logic.RIGHT},
    orange: {x: 10, y: 10, direction: logic.RIGHT}
  }, {input: {pacman: logic.RIGHT, red: logic.NONE, orange: logic.NONE}})).toEqual({
    collision: false,
    board: mockState.board,
    pacman: {x: 6, y: 5, direction: logic.RIGHT},
    red: {x: 10, y: 10, direction: logic.RIGHT},
    orange: {x: 10, y: 10, direction: logic.RIGHT},
  });
});

test('if collision is true expect input === ouput', () => {
  const currentState = {...mockState, collision: true};
  expect(logic.computeNextState(currentState, {input: {pacman: logic.NONE, red: logic.NONE, orange: logic.NONE}})).toEqual(currentState);
});

test('sprites on same square results in collision', () => {
  const currentState = {
    ...mockState,
    pacman: {x: 9, y: 7, direction: logic.LEFT},
    red: {x: 7, y: 7, direction: logic.RIGHT},
    orange: {x: 1, y: 7, direction: logic.UP}
  };
  const collisionState = {
    ...mockState,
    collision: true,
    pacman: {x: 8, y: 7, direction: logic.LEFT},
    red: {x: 8, y: 7, direction: logic.RIGHT},
    orange: {x: 1, y: 8, direction: logic.UP}
  };
  expect(logic.computeNextState(currentState, {input: {pacman: logic.LEFT, orange: logic.NONE, red: logic.NONE}})).toEqual(collisionState);
});

test('wall === wall', () => {
  expect(logic.isWall({walls: [], x: 0, y: 0})).toBe(false);
  expect(logic.isWall({walls: [{x: 0, y: 0}], x: 0, y: 0})).toBe(true);
  expect(logic.isWall({walls: [{x: 1, y: 0}, {x: 2, y: 0}], x: 0, y: 0})).toBe(false);
  expect(logic.isWall({walls: [{x: 1, y: 0}, {x: 2, y: 5}], x: 2, y: 5})).toBe(true);
  expect(logic.isWall({walls: [{x: 1, y: 0}, {x: 2, y: 5}], x: 0, y: 5})).toBe(false);
});

test('ghosts can catch pacman', () => {
  expect(logic.collisionDetection(
    {x: 8, y: 7, direction: logic.RIGHT},
    {x: 8, y: 7, direction: logic.NONE, activeDirection: logic.LEFT})).toBe(true);
  expect(logic.collisionDetection(
    {x: 8, y: 7, direction: logic.NONE, activeDirection: logic.LEFT},
    {x: 8, y: 7, direction: logic.RIGHT})).toBe(true);
  expect(logic.collisionDetection(
    {x: 9, y: 7, direction: logic.NONE, activeDirection: logic.LEFT},
    {x: 8, y: 7, direction: logic.RIGHT})).toBe(false);
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
  expect(logic.isValidMove({direction: logic.RIGHT, x: 10, y: 10, walls: mockState.board.walls, rows: 12, cols: 12})).toBe(false);
});

test('it should generate valid moves', () => {
  expect(logic.generateValidDirections({walls: [], x: 0, y: 0, rows: 12, cols: 12})).toEqual([logic.UP, logic.RIGHT, logic.DOWN, logic.LEFT]);
  expect(logic.generateValidDirections({walls: [{x: 0, y: 1}, {x: 1, y: 0}], x: 0, y: 0, rows: 12, cols: 12})).toEqual([logic.DOWN, logic.LEFT]);
  expect(logic.generateValidDirections({walls: mockState.board.walls, x: 10, y: 10, rows: 12, cols: 12})).toEqual([logic.DOWN, logic.LEFT]);
});

test('it should move a player', () => {
  const player = {x: 0, y: 0, direction: logic.DOWN};
  expect(logic.movePlayer({player, direction: logic.DOWN, rows: 12, cols: 12})).toEqual({x: 0, y: 11, direction: logic.DOWN});
  expect(logic.movePlayer({player, direction: logic.RIGHT, rows: 12, cols: 12})).toEqual({x: 1, y: 0, direction: logic.RIGHT});
  expect(logic.movePlayer({
    player: {x: 10, y: 10, direction: logic.RIGHT},
    direction: logic.DOWN,
    rows: 12,
    cols: 12
  })).toEqual({x: 10, y: 9, direction: logic.DOWN});
});