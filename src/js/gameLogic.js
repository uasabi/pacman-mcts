import {TICK, MOVE_PACMAN, MOVE_ORANGE, MOVE_RED, SIMULATE} from './actions';

export const LEFT = 'left';
export const RIGHT = 'right';
export const UP = 'up';
export const DOWN = 'down';
export const NONE = 'nope';

export function crunchState(state, action) {
  switch(action.type) {
  case TICK:
    return (action.time - state.lastRun > 1000) ?
      {...computeNextState(state), lastRun: action.time} : state;
  case SIMULATE:
    return computeNextState(state);
  case MOVE_PACMAN:
    return {...state, pacman: {...state.pacman, direction: action.direction}};
  case MOVE_ORANGE:
    return {...state, orange: {...state.orange, direction: action.direction}};
  case MOVE_RED:
    return {...state, red: {...state.red, direction: action.direction}};
  default:
    return state;
  }
}

export function computeNextState(state) {
  if (state.collision) return state;

  const playerStates = {
    pacman: state.pacman,
    red: state.red,
    orange: state.orange
  };

  const finalState = Object.keys(playerStates).reduce((state, playerName) => {
    const playerState = playerStates[playerName];
    const newPlayerState = movePlayer({
      player: playerState,
      direction: playerState.direction,
      rows: state.board.rows,
      cols: state.board.cols
    });
    return isValidMove({
      walls: state.board.walls,
      x: newPlayerState.x,
      y: newPlayerState.y,
      rows: state.board.rows,
      cols: state.board.cols
    }) ? {...state, [playerName]: newPlayerState} : state;
  }, state);

  finalState.collision = [finalState.red, finalState.orange].some(ghost => collisionDetection(ghost, finalState.pacman));
  return finalState;
}

export function isWall({walls, x, y}) {
  return !!walls.find(element => element.x === x && element.y === y);
}

export function convertDirectionToCoordinate({direction}) {
  switch(direction) {
  case LEFT:
    return {x: -1, y: 0};
  case RIGHT:
    return {x: +1, y: 0};
  case UP:
    return {x: 0, y: +1};
  case DOWN:
    return {x: 0, y: -1};
  default:
    return {x: 0, y: 0};
  }
}

export function isInsideBoard({cols, rows, x, y}) {
  return (x >= 0 && x < cols) && (y >= 0 && y < rows);
}

export function wrapAroundBoard({cols, rows, x, y}) {
  let newX, newY;
  newX = x < 0 ? cols + x : x;
  newX = x >= cols ? x - cols : newX;
  newY = y < 0 ? rows + y : y;
  newY = y >= rows ? y - rows : newY;
  return {x: newX, y: newY};
}

export function isValidMove({walls, direction, x, y, rows, cols}) {
  const {x: plusX, y: plusY} = convertDirectionToCoordinate({direction});
  const newCoordinates = {x: x + plusX, y: y + plusY};
  const {x: updatedX, y: updatedY} = isInsideBoard({cols, rows, x: x + plusX, y: y + plusY}) ?
    newCoordinates : wrapAroundBoard({rows, cols, x, y});
  return !isWall({walls, x: updatedX, y: updatedY});
}

export function generateValidDirections({walls, x, y, cols, rows}) {
  return [UP, RIGHT, DOWN, LEFT].filter(direction => isValidMove({walls, direction, x, y, cols, rows}));
}

export function movePlayer({player, direction, rows, cols}) {
  const {x: plusX, y: plusY} = convertDirectionToCoordinate({direction});
  const {x, y} = wrapAroundBoard({cols, rows, x: player.x + plusX, y: player.y + plusY});
  return {...player, x, y, direction};
}

export function collisionDetection(entityA, entityB) {
  return entityA.x === entityB.x && entityA.y === entityB.y;
}

export function isGameOver(state) {
  return !!state.collision;
}