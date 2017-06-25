import {UP, DOWN, LEFT, RIGHT} from './gameLogic';

export function makeBoardPiece(id, cellsize = 4, isPermeable = true) {
  const backgroundColor = isPermeable ? 'black' : 'blue';
  return `
  <div
    id='${id}'
    style='box-sizing: border-box; display: inline-block; margin: 0; padding: 0; height: ${cellsize}em; width: ${cellsize}em; background-color: ${backgroundColor};'
  >
  </div>`;
}

export function makePacman(pacman, cellsize = 4) {
  return `
   <div
    style='height: ${cellsize}em; width: ${cellsize}em; background-color: black; display: inline-block;'>
    <svg viewbox='0 0 100 100' id='pacman-sprite' ${rotate(pacman.direction)}>
    <use xlink:href='#pacman' />
    </svg>
   </div>
 `;
}

export function makeRed(red, cellsize = 4) {
  return `
    <div
      style='height: ${cellsize}em; width: ${cellsize}em; background-color: black; display: inline-block;'>
      <svg viewbox='0 0 100 100' id='pacman-sprite'>
      <use xlink:href='#red-ghost' />
      </svg>
    </div>
  `;
}

export function makeOrange(orange, cellsize = 4) {
  return `
    <div
      style='height: ${cellsize}em; width: ${cellsize}em; background-color: black; display: inline-block;'>
      <svg viewbox='0 0 100 100' id='pacman-sprite'>
      <use xlink:href='#orange-ghost' />
      </svg>
    </div>
  `;
}

export function makePill(cellsize = 4) {
  return `
    <div
      style='height: ${cellsize}em; width: ${cellsize}em; background-color: black; display: inline-block;'>
      <svg viewbox='0 0 100 100' id='pacman-sprite'>
      <use xlink:href='#pill' />
      </svg>
    </div>
  `;
}

function rotate(direction) {
  switch(direction) {
  case UP:
    return 'transform="rotate(90)"';
  case DOWN:
    return 'transform="rotate(270)"';
  case RIGHT:
    return 'transform="rotate(180)"';
  case LEFT:
  default:
    return '';
  }
}

export function renderBoard(state) {
  const boardHtml = buildTheBoard(state);
  document.getElementById('board-container').innerHTML = boardHtml;
}

export function buildTheBoard(state) {
  const cellSize = 4;
  const matrix = [];
  const rows = state.board.rows;
  const cols = state.board.cols;
  for(let i = 0, iLen = cols; i < iLen; i += 1) {
    matrix[i] = [];
    for(let j = 0, jLen = rows; j < jLen; j += 1) {
      matrix[i][j] = makeBoardPiece(`${i}x${j}`, state.board.cellSize);
    }
  }

  state.board.walls.forEach(wall => {
    matrix[wall.x][wall.y] = makeBoardPiece(`${wall.y}x${wall.x}`, cellSize, false);
  });
  state.pills.forEach(pill => matrix[pill.x][pill.y] = makePill(cellSize));
  matrix[state.pacman.x][state.pacman.y] = makePacman(state.pacman);
  matrix[state.red.x][state.red.y] = makeRed(state.red);
  matrix[state.orange.x][state.orange.y] = makeOrange(state.orange);

  const renderMatrix = [];
  for(let j = 0, jLen = cols; j < jLen; j += 1) {
    for(let i = 0, iLen = rows; i < iLen; i += 1) {
      renderMatrix.push(matrix[i][rows - j - 1]);
    }
  }
  return `
    <div style='max-width: ${(state.board.cols * cellSize) + cellSize}em; min-width: ${(state.board.cols * cellSize) + cellSize}em'>
    ${renderMatrix.join('')}
    </div>`;
}