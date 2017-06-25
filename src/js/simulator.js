import {crunchState, UP, DOWN, LEFT, RIGHT, generateValidDirections} from './gameLogic';
import {computeNextDirectionForOrange, computeNextDirectionForRed} from './ghostAi';
import {createActionMovePacman, createActionMoveOrange, createActionMoveRed} from './actions';

export function computePossibleDirections(state) {
  return generateValidDirections({
    walls: state.board.walls,
    cols: state.board.rows,
    rows: state.board.rows,
    x: state.pacman.x,
    y: state.pacman.y
  }).map(pacmanDirection => {
    return [pacmanDirection, computeNextDirectionForRed(state), computeNextDirectionForOrange(state)];
  });
}

export function generateChildStates(parentState, directionTriplets) {
  return directionTriplets.map(([directionPacman, directionRed, directionOrange]) => {
    return [
      createActionMovePacman({direction: directionPacman}),
      createActionMoveRed({direction: directionRed}),
      createActionMoveOrange({direction: directionOrange}),
    ].reduce((state, action) => crunchState(state, action), parentState);
  });
}