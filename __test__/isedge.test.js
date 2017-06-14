const logic = require('../src/js/pre-logic.js');
let fakeState = {
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
    x:5,
    y:5,
    direction: 'nope'
  },
  red: {
    x: 7,
    y: 11,
    direction: 'right'
  },
  orange: {
    x: 1,
    y: 8,
    direction: 'up'
  }
};

test('returns true if at edge', () => {
  expect(logic.isEdge('down', {x:5, y:11})).toBe(true);
});

test('wall === wall', () => {
  let checkIfWall = logic.checkWall(fakeState);
  expect(checkIfWall(fakeState.pacman)).toBe(false);
});

// test('pacman doesn\'t go through walls', () => {
//   mockBoardObj(12,12,5);
//   fakeState.pacman = {
//     x: 1,
//     y: 12,
//     direction: 'nope'
//   };
//   let checkIfWall = logic.checkWall(fakeState);
//   let crunchSpriteState = logic.crunchSprite(fakeState);
//   expect(logic.crunchState(fakeState, 'left')).toBe(fakeState);
// });
