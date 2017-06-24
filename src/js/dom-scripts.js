import {renderBoard} from './render';

let then, fpsInterval, startTime;
let count = 0;
const {crunchState, makeBoardPiece, makeOrange, makePacman, makeRed} = require('./pre-logic');
let {currentState, lastKeyPressed} = require('./pre-logic');

function startAnimating(fps) {
  fpsInterval = 1000 / fps;
  then = Date.now();
  startTime = then;
  mainLoop();
}

function mainLoop() {
  requestAnimationFrame(mainLoop);
  let now = Date.now();
  let elapsed = now - then;
  if (elapsed > fpsInterval) {
    then = now - (elapsed % fpsInterval);
    currentState = crunchState(currentState, {type: 'Tick', deltaInMilliseconds: then, input: {
      pacman: lastKeyPressed,
      red: 'nope',
      orange: 'nope'
    }}) || currentState;
    renderBoard(currentState);
  }
}

document.addEventListener('keydown', (e)=> {
  e = e || window.event;
  switch(e.keyCode) {
  case 37:
    lastKeyPressed = 'left';
    break;
  case 38:
    lastKeyPressed = 'up';
    break;
  case 39:
    lastKeyPressed = 'right';
    break;
  case 40:
    lastKeyPressed = 'down';
    break;
  }
});

startAnimating(0.4);
