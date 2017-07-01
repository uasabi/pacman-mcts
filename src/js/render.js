import {UP, DOWN, LEFT, RIGHT} from './gameLogic';

export function makeTile() {
  return '<div class="tile"></div>';
}

export function makeWall() {
  return '<div class="tile wall"></div>';
}

export function makePacman(pacman) {
  return `
    <div class="tile">
      <svg viewbox='0 0 40 40' transform="scale(1.4, 1.4) ${rotate(pacman.direction)}">
        <path fill="#344975" d="M19.6,8c4.3-0.4,8.3,1.4,10.8,4.5l-9.6,7.9L32,25.9c-1.8,3.7-5.5,6.5-10,6.9C15.1,33.4,9,28.4,8.4,21.6
          S12.7,8.6,19.6,8z"/>
      </svg>
    </div>
 `;
}

export function makeRed(red) {
  return `
    <div class="tile">
      <svg viewbox='0 0 40 40'>
        <path fill="#AD402C" d="M20.1,6.3c-6.9,0-12.5,5.6-12.5,12.5v13.1c0,1.7,1.4,3.1,3.1,3.1s3.1-1.4,3.1-3.1c0,1.7,1.4,3.1,3.1,3.1
          c1.7,0,3.1-1.4,3.1-3.1c0,1.7,1.4,3.1,3.1,3.1c1.7,0,3.1-1.4,3.1-3.1c0,1.7,1.4,3.1,3.1,3.1s3.1-1.4,3.1-3.1V18.7
          C32.6,11.9,27,6.3,20.1,6.3z"/>
      </svg>
    </div>
  `;
}

export function makeOrange(orange) {
  return `
    <div class="tile">
      <svg viewbox='0 0 40 40'>
        <path fill="#F4A361" d="M20.1,6.3c-6.9,0-12.5,5.6-12.5,12.5v13.1c0,1.7,1.4,3.1,3.1,3.1s3.1-1.4,3.1-3.1c0,1.7,1.4,3.1,3.1,3.1
          c1.7,0,3.1-1.4,3.1-3.1c0,1.7,1.4,3.1,3.1,3.1c1.7,0,3.1-1.4,3.1-3.1c0,1.7,1.4,3.1,3.1,3.1s3.1-1.4,3.1-3.1V18.7
          C32.6,11.9,27,6.3,20.1,6.3z"/>
      </svg>
    </div>
  `;
}

export function makePill() {
  return `
    <div class="tile">
      <svg viewbox='0 0 100 100' id='pacman-sprite'>
        <circle fill="#846785" cx="50" cy="50" r="10"/>
      </svg>
    </div>
  `;
}

function rotate(direction) {
  switch(direction) {
  case UP:
    return 'rotate(270)';
  case DOWN:
    return 'rotate(90)';
  case RIGHT:
    return '';
  case LEFT:
    return 'rotate(180)';
  default:
    return '';
  }
}

export function renderBoard(state, element) {
  const boardHtml = buildTheBoard(state);
  element.innerHTML = boardHtml;
}

export function buildTheBoard(state) {
  const cellSize = 4;
  const matrix = [];
  const rows = state.board.rows;
  const cols = state.board.cols;
  for(let i = 0, iLen = cols; i < iLen; i += 1) {
    matrix[i] = [];
    for(let j = 0, jLen = rows; j < jLen; j += 1) {
      matrix[i][j] = makeTile();
    }
  }

  state.board.walls.forEach(wall => matrix[wall.x][wall.y] = makeWall());
  state.pills.forEach(pill => matrix[pill.x][pill.y] = makePill());
  matrix[state.pacman.x][state.pacman.y] = makePacman(state.pacman);
  matrix[state.red.x][state.red.y] = makeRed(state.red);
  matrix[state.orange.x][state.orange.y] = makeOrange(state.orange);

  const renderMatrix = [];
  for(let j = 0, jLen = cols; j < jLen; j += 1) {
    for(let i = 0, iLen = rows; i < iLen; i += 1) {
      renderMatrix.push(matrix[i][rows - j - 1]);
    }
  }
  return `<div class="board" style="width: calc(${cellSize * cols}em + ${2 * cols}px)">${renderMatrix.join('')}</div>`;
}