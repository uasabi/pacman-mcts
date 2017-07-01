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
      <svg viewbox='0 0 310 310' id='pacman-sprite' ${rotate(pacman.direction)}>
        <path d="M-8.8817842e-16,221.303533 C25.5725766,273.737622 80.5345203,310 144.211886,310 C232.301304,310 303.711886,240.604136 303.711886,155 C303.711886,69.3958638 232.301304,0 144.211886,0 C82.8032711,0 29.5001009,33.7244373 2.84435068,83.1544643 L138.643891,160.52454 L-4.84945417e-13,221.303533 Z" fill="#F8E81C"></path>
      </svg>
    </div>
 `;
}

export function makeRed(red, cellsize = 4) {
  return `
    <div
      style='height: ${cellsize}em; width: ${cellsize}em; background-color: black; display: inline-block;'>
      <svg viewbox='0 0 310 310' id='pacman-sprite'>
        <path d="M148.263 275h.474L186 216l36 57V99.998C222 44.776 177.228 0 122 0h-22C44.775 0 0 44.77 0 99.998V273l36-57 37.263 59h.474L111 216l37.263 59z" fill="#F62323"/>
        <ellipse stroke="#FFF" fill="#FFF" cx="62" cy="105" rx="15" ry="33"/>
        <ellipse stroke="#FFF" fill="#FFF" cx="139" cy="105" rx="15" ry="33"/>
      </svg>
    </div>
  `;
}

export function makeOrange(orange, cellsize = 4) {
  return `
    <div
      style='height: ${cellsize}em; width: ${cellsize}em; background-color: black; display: inline-block;'>
      <svg viewbox='0 0 310 310' id='pacman-sprite'>
        <path d="M148.263 275h.474L186 216l36 57V99.998C222 44.776 177.228 0 122 0h-22C44.775 0 0 44.77 0 99.998V273l36-57 37.263 59h.474L111 216l37.263 59z" fill="#F6A623"/>
        <ellipse stroke="#FFF" fill="#FFF" cx="62" cy="105" rx="15" ry="33"/>
        <ellipse stroke="#FFF" fill="#FFF" cx="139" cy="105" rx="15" ry="33"/>
      </svg>
    </div>
  `;
}

export function makePill(cellsize = 4) {
  return `
    <div
      style='height: ${cellsize}em; width: ${cellsize}em; background-color: black; display: inline-block;'>
      <svg viewbox='0 0 100 100' id='pacman-sprite'>
        <circle stroke="#FFF" fill="#FFF" cx="50" cy="50" r="10"/>
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
  document.querySelector('body').innerHTML = boardHtml;
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