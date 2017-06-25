import {renderBoard} from './render';
import {crunchState, NONE, LEFT, RIGHT, UP, DOWN} from './pre-logic';
import {createActionTick, createActionMovePacman} from './actions';

let then, fpsInterval, startTime;
let lastKeyPressed = NONE;
let currentState = {
  collision: false,
  lastRun: Date.now(),
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
    direction: LEFT,
  },
  red: {
    x: 7,
    y: 11,
    direction: RIGHT
  },
  orange: {
    x: 1,
    y: 8,
    direction: UP
  }
};

function mainLoop() {
  (typeof requestAnimationFrame !== 'undefined') ?
    requestAnimationFrame(mainLoop) : setImmediate(mainLoop);

  const actions = [createActionTick({time: Date.now()})]
    .concat(lastKeyPressed === NONE ? [] : createActionMovePacman({direction: lastKeyPressed}));
  currentState = actions.reduce((state, action) => crunchState(state, action), currentState);
  renderBoard(currentState);
}

document.addEventListener('keydown', e => {
  e = e || window.event;
  switch(e.keyCode) {
  case 37:
    lastKeyPressed = LEFT;
    break;
  case 38:
    lastKeyPressed = UP;
    break;
  case 39:
    lastKeyPressed = RIGHT;
    break;
  case 40:
    lastKeyPressed = DOWN;
    break;
  }
});

mainLoop();
