import {renderBoard} from './render';
import {crunchState, NONE, LEFT, RIGHT, UP, DOWN} from './gameLogic';
import {createActionTick, createActionMovePacman, createActionMoveOrange, createActionMoveRed} from './actions';
import {computeNextDirectionForOrange, computeNextDirectionForRed} from './ghostAi';
import {pickNextMove} from './simulator';

let then, fpsInterval, startTime;
let lastKeyPressed = NONE;
let currentState = {
  collision: false,
  lastRun: Date.now(),
  pills: [
    {x: 3, y: 8},
    {x: 4, y: 8},
    {x: 5, y: 8},
    {x: 6, y: 8},
    {x: 7, y: 8},
    {x: 8, y: 8},
    {x: 8, y: 7},
    {x: 8, y: 6},
    {x: 8, y: 5},
    {x: 8, y: 4},
    {x: 8, y: 3},
    {x: 1, y: 1},
    {x: 2, y: 1},
    {x: 1, y: 2},
    {x: 2, y: 2},
    {x: 2, y: 6},
    {x: 2, y: 5},
    {x: 2, y: 4},
    {x: 2, y: 3},
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
  pacman: {
    x: 5,
    y: 5,
    direction: LEFT,
    score: 0,
  },
  red: {
    x: 7,
    y: 11,
    direction: RIGHT,
    score: 0,
  },
  orange: {
    x: 1,
    y: 8,
    direction: UP,
    score: 0,
  }
};

function mainLoop() {
  // (typeof requestAnimationFrame !== 'undefined') ?
  //   requestAnimationFrame(mainLoop) : setImmediate(mainLoop);

  const actions = [createActionTick({time: Date.now()})]
    .concat(lastKeyPressed === NONE ? [] : createActionMovePacman({direction: lastKeyPressed}))
    .concat(createActionMoveOrange({direction: computeNextDirectionForOrange(currentState)}))
    .concat(createActionMoveRed({direction: computeNextDirectionForRed(currentState)}));
  currentState = actions.reduce((state, action) => crunchState(state, action), currentState);
  renderBoard(currentState, document.querySelector('body'));
}

function aiLoop() {
  setTimeout(aiLoop, 1000 / 10);

  const actions = [
    createActionTick({time: Date.now()}),
    createActionMovePacman({direction: pickNextMove(currentState)}),
    createActionMoveOrange({direction: computeNextDirectionForOrange(currentState)}),
    createActionMoveRed({direction: computeNextDirectionForRed(currentState)})
  ];
  currentState = actions.reduce((state, action) => crunchState(state, action), currentState);
  renderBoard(currentState, document.querySelector('body'));
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

// aiLoop();
mainLoop();
