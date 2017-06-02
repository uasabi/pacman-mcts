let then, fpsInterval;
const { crunchSpriteState,crunchState,checkIfWall,makeBoardPiece,isEdge} = require('./logic.js');
let {currentState, lastKeyPressed} = require('./logic.js');
const boardContainer = document.getElementById('board-container');
const pacmanSprite = document.getElementById('pacman-sprite');

function startAnimating(fps) {
  fpsInterval = 1000 / fps;
  then = Date.now();
  startTime = then;
  mainLoop();
}

const tick = {
  type: 'Tick',
  deltaInMilliseconds: 10000,
  input: 'up'
}

boardContainer.setAttribute('style', `min-width: ${currentState.board.rows*currentState.board.cellSize+currentState.board.cellSize}em; max-width: ${currentState.board.rows*currentState.board.cellSize+currentState.board.cellSize}em;`);

const buildBoard = function(size, rows, cols) {
  for (let i = 1; i <= rows; i++ ) {
    for (let j = 1; j <= cols; j++ ) {
      let newDiv = document.createElement('div');
      newDiv.classList = "board-tile";
      newDiv.id=`${i}x${j}`;
      // newDiv.textContent = `row ${i}/ col ${j}`;
      if ( i === 1 || i === rows || j === 1 || j === cols ) {
        if (i !== 7 && i !== 8 && i !== 6 && i !== 5 && j!==5 && j !== 7 && j !== 8 && j !== 6) {
          newDiv = makeBoardPiece(newDiv, false, currentState.board.cellSize, newDiv.id);
        } else {
          newDiv = makeBoardPiece(newDiv, true, currentState.board.cellSize, newDiv.id);
        }
      } else {
          newDiv = makeBoardPiece(newDiv, true, currentState.board.cellSize, newDiv.id);
        }
      let boardArr = currentState.board.boardArr;
      let boardObj = currentState.board.boardObj;
      boardArr.push(newDiv);
      boardObj[newDiv.id] = newDiv;
    }
  }
  for (let i = 0; i < currentState.board.boardArr.length; i++ ) {
  boardContainer.append(currentState.board.boardArr[i].physicalEntity);
  }
}

function renderBoard(state) {
  affixSprite(pacmanSprite, state.pacman);
}

function affixSprite(sprite, spriteState) {
  let nextSpritePlace = document.getElementById(`${spriteState.y}x${spriteState.x}`);
  nextSpritePlace.append(sprite);
}

function mainLoop() {
  requestAnimationFrame(mainLoop);
  now = Date.now();
  elapsed = now - then;
  if (elapsed > fpsInterval) {
    then = now - (elapsed % fpsInterval);
    currentState =  crunchState(currentState, {type: 'Tick', deltaInMilliseconds: then, input: lastKeyPressed}) || currentState;
    renderBoard(currentState);
  }
}

document.addEventListener('keydown', (e)=> {
  e = e || window.event;
  if ( e.keyCode === 37 ) {
    lastKeyPressed = 'left';
  } else if ( e.keyCode === 38) {
    lastKeyPressed = 'up';
  } else if ( e.keyCode === 39) {
    lastKeyPressed = 'right';
  } else if ( e.keyCode === 40) {
    lastKeyPressed = 'down';
  }
});

buildBoard(currentState.board.size, currentState.board.rows, currentState.board.size/currentState.board.rows);
startAnimating(2);
