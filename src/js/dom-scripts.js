let then, fpsInterval, startTime;
const {crunchState, makeBoardPiece, makeOrange, makePacman, makeRed} = require('./pre-logic');
let {currentState, lastKeyPressed} = require('./pre-logic');

function startAnimating(fps) {
  fpsInterval = 1000 / fps;
  then = Date.now();
  startTime = then;
  mainLoop();
}

function buildTheBoard(size, rows, cols) {
  const makeColumnForRow = (rowIndex) => Array(cols).fill(0)
    .map((_, columnIndex) => makeBoardPiece(`${rowIndex}x${columnIndex}`, currentState.board.cellSize));
  const matrix = Array(rows).fill(0).map((_, rowIndex) => makeColumnForRow(rowIndex));

  currentState.board.walls.forEach(wall => {
    matrix[wall.y][wall.x] = makeBoardPiece(`${wall.y}x${wall.x}`, currentState.board.cellSize, false);
  });

  matrix[currentState.pacman.y][currentState.pacman.x] = makePacman(currentState.board.cellSize);
  matrix[currentState.red.y][currentState.red.x] = makeRed(currentState.board.cellSize);
  matrix[currentState.orange.y][currentState.orange.x] = makeOrange(currentState.board.cellSize);

  return `
    <div style="max-width: ${(currentState.board.rows * currentState.board.cellSize) + 7}em;">
      ${matrix.map(it => it.join('')).join('')}
    </div>`;
}

function renderBoard(state) {
  const boardHtml = buildTheBoard(state.board.size, state.board.rows, state.board.rows);
  document.getElementById('board-container').innerHTML = boardHtml;
}

function mainLoop() {
  requestAnimationFrame(mainLoop);
  let now = Date.now();
  let elapsed = now - then;
  if (elapsed > fpsInterval) {
    then = now - (elapsed % fpsInterval);
    currentState = crunchState(currentState, {type: 'Tick', deltaInMilliseconds: then, input: lastKeyPressed}) || currentState;
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
