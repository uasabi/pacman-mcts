const logic = require('../src/js/pre-logic.js');
let fakeState = {
  board: {
    size: 144,
    rows: 12,
    cellSize: 4,
    boardArr: [],
    boardObj: {}
  },
  pacman: {
    x:5,
    y:5,
    direction: 'nope'
  }
};

function mockBoardObj(rows,cols,permeableArea) {
  for (let i = 0; i <= rows; i++) {
    for (let j = 0; j <= cols; j++) {
      let newObj = `${i}x${j}`;
      if ( i === permeableArea || j === permeableArea) {
        fakeState.board.boardObj[newObj] = {};
        fakeState.board.boardObj[newObj].permeable = true;
      } else {
        fakeState.board.boardObj[newObj] = {};
        fakeState.board.boardObj[newObj].permeable = false;
      }
    }
  }
}

test('returns true if at edge', () => {
  expect(logic.isEdge('down', {x:5, y:12})).toBe(true);
});

test('wall === wall', () => {
  mockBoardObj(12,12,5);
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
