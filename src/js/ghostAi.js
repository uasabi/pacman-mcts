import {movePlayer, isValidMove, generateValidDirections} from './gameLogic';

export function nextDirection({player, direction, walls, rows, cols}) {
  const newPositon = movePlayer({
    player,
    direction,
    rows: rows,
    cols: rows
  });
  const isPositionValid = isValidMove({
    direction,
    walls: walls,
    x: player.x,
    y: player.y,
    rows: rows,
    cols: rows
  });
  return isPositionValid ? direction : generateValidDirections({
    walls: walls,
    x: player.x,
    y: player.y,
    cols: rows,
    rows: rows
  })[0];
}

export function computeNextDirectionForRed(state) {
  return nextDirection({
    player: state.red,
    direction: state.red.direction,
    walls: state.board.walls,
    rows: state.board.rows,
    cols: state.board.rows,
  });
}

export function computeNextDirectionForOrange(state) {
  return nextDirection({
    player: state.orange,
    direction: state.orange.direction,
    walls: state.board.walls,
    rows: state.board.rows,
    cols: state.board.rows,
  });
}