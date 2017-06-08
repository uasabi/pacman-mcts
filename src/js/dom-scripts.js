let then, fpsInterval, startTime;
const {crunchState,makeBoardPiece} = require('./logic.js');
let {currentState, lastKeyPressed} = require('./logic.js');
const pacmanSprite = document.getElementById('pacman-sprite');
const redSprite = document.getElementById('ghost-sprite-r');
const orangeSprite = document.getElementById('ghost-sprite-o');

function startAnimating(fps) {
  fpsInterval = 1000 / fps;
  then = Date.now();
  startTime = then;
  buildBoard(currentState.board.size, currentState.board.rows, currentState.board.size/currentState.board.rows);
  mainLoop();
}

function buildTheBoard(boardContainer) {
  boardContainer.setAttribute('style', `min-width: ${currentState.board.rows*currentState.board.cellSize+currentState.board.cellSize}em; max-width: ${currentState.board.rows*currentState.board.cellSize+currentState.board.cellSize}em;`);
  return (size, rows, cols) => {
    for (let i = 1; i <= rows; i++ ) {
      for (let j = 1; j <= cols; j++ ) {
        let newDiv = document.createElement('div');
        newDiv.classList = 'board-tile';
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
  };
}

const buildBoard = buildTheBoard(document.getElementById('board-container'));

function renderBoard(state) {
  buildBoard();
  affixSprite(pacmanSprite, state.pacman);
  affixSprite(redSprite, state.red);
  affixSprite(orangeSprite, state.orange);
}

function affixSprite(sprite, spriteState) {
  let nextSpritePlace = document.getElementById(`${spriteState.y}x${spriteState.x}`);
  nextSpritePlace.append(sprite);
}

function mainLoop() {
  requestAnimationFrame(mainLoop);
  let now = Date.now();
  let elapsed = now - then;
  if (elapsed > fpsInterval) {
    then = now - (elapsed % fpsInterval);
    currentState =  crunchState(currentState, {type: 'Tick', deltaInMilliseconds: then, input: lastKeyPressed}) || currentState;
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

startAnimating(2);
