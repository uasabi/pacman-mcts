export function makeBoardPiece(id, cellsize, isPermeable = true) {
  const backgroundColor = isPermeable ? 'black' : 'blue';
  return `
  <div
    id='${id}'
    style='box-sizing: border-box; display: inline-block; margin: 0; padding: 0; height: ${cellsize}em; width: ${cellsize}em; background-color: ${backgroundColor};'
  >
  </div>`;
}

export function makePacman(cellsize) {
  return `
   <div
     style='height: ${cellsize}em; width: ${cellsize}em; background-color: black; display: inline-block;'>
     <svg viewbox='0 0 100 100' id='pacman-sprite'>
     <use xlink:href='#pacman' />
     </svg>
   </div>
 `;
}

export function makeRed(cellsize) {
  return `
    <div
      style='height: ${cellsize}em; width: ${cellsize}em; background-color: black; display: inline-block;'>
      <svg viewbox='0 0 100 100' id='pacman-sprite'>
      <use xlink:href='#red-ghost' />
      </svg>
    </div>
  `;
}

export function makeOrange(cellsize) {
  return `
    <div
      style='height: ${cellsize}em; width: ${cellsize}em; background-color: black; display: inline-block;'>
      <svg viewbox='0 0 100 100' id='pacman-sprite'>
      <use xlink:href='#orange-ghost' />
      </svg>
    </div>
  `;
}

export function buildTheBoard(state) {
  const makeColumnForRow = (rowIndex) => Array(state.board.rows).fill(0)
  .map((_, columnIndex) => makeBoardPiece(`${rowIndex}x${columnIndex}`, state.board.cellSize));
  const matrix = Array(state.board.rows).fill(0).map((_, rowIndex) => makeColumnForRow(rowIndex));
  state.board.walls.forEach(wall => {
    matrix[wall.y][wall.x] = makeBoardPiece(`${wall.y}x${wall.x}`, state.board.cellSize, false);
  });
  matrix[state.pacman.y][state.pacman.x] = makePacman(state.board.cellSize);
  matrix[state.red.y][state.red.x] = makeRed(state.board.cellSize);
  matrix[state.orange.y][state.orange.x] = makeOrange(state.board.cellSize);
  return `
    <div style='max-width: ${(state.board.rows * state.board.cellSize) + state.board.cellSize}em; min-width: ${(state.board.rows * state.board.cellSize) + state.board.cellSize}em'>
    ${matrix.map(it => it.join('')).join('')}
    </div>`;
}

export function renderBoard(state) {
  const boardHtml = buildTheBoard(state);
  document.getElementById('board-container').innerHTML = boardHtml;
}